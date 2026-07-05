# engine/reactorPhysics.py
import numpy as np
from scipy.integrate import odeint
from .reliefValve import ReliefValve

class ReactorEngine:
    def __init__(self):
        # Initial State: [Temperature (K), Monomer Mass (kg), Product Mass (kg)]
        self.state = np.array([305.0, 100.0, 0.0]) 
        self.t_step = 0.1 # Time step for integration
        
        # Set safety threshold: Opens at 320K, Resets at 310K (10K hysteresis)
        self.psv = ReliefValve(set_pressure=320.0, reset_margin=10.0) 

    def model_equations(self, state, t, m_dot_f, Q_requested, relief_effect):
        T_R, m_A, m_P = state
        
        # Physics Parameters
        E_a = 5000.0
        R = 8.314
        k_0 = 10.0   # Reaction rate constant
        delH = 100.0 # Heat of reaction
        
        # Reaction Rate (Arrhenius Law)
        # 1e-3 added to denominator to avoid division by zero
        rate = k_0 * np.exp(-E_a / (R * (T_R + 1e-3))) * m_A
        
        # Apply cooling: requested cooling + relief valve cooling contribution
        Q_total = Q_requested + relief_effect
        
        # ODEs (Differential Equations)
        dT_dt = (rate * delH - Q_total) / (m_A + m_P + 100)
        dmA_dt = m_dot_f - rate
        dmP_dt = rate
        
        return [dT_dt, dmA_dt, dmP_dt]

    def step(self, m_dot_f, Q_requested):
        """
        Advances the simulation by one time step and calculates process variables.
        """
        # 1. Check if the relief valve should trigger (with hysteresis logic)
        relief_effect = self.psv.get_relief_effect(self.state[0])
        
        # 2. Integrate the system for the time step
        t = [0, self.t_step]
        new_state = odeint(self.model_equations, self.state, t, 
                           args=(m_dot_f, Q_requested, relief_effect))
        
        # Update the internal state
        self.state = new_state[-1]
        
        # Derive Process Variables
        T_R, m_A, m_P = self.state
        
        # Idealized Pressure Model: Pressure increases with mass and temperature
        pressure = (m_A * 0.8) + (T_R * 0.4) - 200.0
        
        # Return state as a dictionary for the frontend
        return {
            "T_R": float(T_R),
            "P_R": float(pressure),
            "m_A": float(m_A), # Monomer Concentration
            "m_P": float(m_P), # Product Mass
            "PSV_Open": self.psv.is_open
        }

# --- TEST SCRIPT ---
if __name__ == "__main__":
    engine = ReactorEngine()
    print("Testing Reactor Engine (with Hysteresis and Concentration)...")
    result = engine.step(m_dot_f=1.0, Q_requested=50.0)
    print(f"Reactor Temperature: {result['T_R']:.2f} K")
    print(f"Reactor Pressure: {result['P_R']:.2f} kPa")
    print(f"Monomer Concentration: {result['m_A']:.2f} kg")
    print(f"Relief Valve Status: {'OPEN' if result['PSV_Open'] else 'CLOSED'}")
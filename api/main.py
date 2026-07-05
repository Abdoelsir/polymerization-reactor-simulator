# api/main.py
import sys
import os

# Add the project root (one level up from api) to the system path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Now import the engine
from fastapi import FastAPI
from engine.reactorPhysics import ReactorEngine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS so your React app can communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the engine once when the application starts
engine = ReactorEngine()

@app.get("/step")
def step_simulation(m_dot_f: float = 1.0, Q_requested: float = 50.0):
    """
    Advances the simulation by one step. 
    The engine returns a dictionary with T_R, P_R, m_A, m_P, and PSV_Open.
    FastAPI automatically serializes this dictionary to JSON.
    """
    state = engine.step(m_dot_f, Q_requested)
    return state

@app.get("/reset")
def reset_simulation():
    """
    Resets the reactor to initial conditions.
    """
    # If you implement a reset method in ReactorEngine, call it here.
    # For now, we re-initialize the engine.
    global engine
    engine = ReactorEngine()
    return {"status": "reset"}
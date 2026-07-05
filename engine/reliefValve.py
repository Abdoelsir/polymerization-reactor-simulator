# engine/reliefValve.py

class ReliefValve:
    def __init__(self, set_pressure=320.0, reset_margin=10.0):
        """
        set_pressure: Temperature at which the valve opens.
        reset_margin: Temperature drop required before the valve closes (hysteresis).
        """
        self.set_pressure = set_pressure
        self.reset_temp = set_pressure - reset_margin
        self.is_open = False

    def get_relief_effect(self, current_temp):
        """
        Logic:
        - If already open, stay open until temp < reset_temp.
        - If closed, open only if temp > set_pressure.
        """
        if self.is_open:
            if current_temp > self.reset_temp:
                return 50000.0  # Valve remains open
            else:
                self.is_open = False # Valve reseats
                return 0.0
        else:
            if current_temp > self.set_pressure:
                self.is_open = True
                return 50000.0 # Valve pops
            return 0.0
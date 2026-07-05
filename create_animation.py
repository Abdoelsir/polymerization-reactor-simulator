# create_animation.py
import matplotlib.pyplot as plt
from matplotlib import rcParams
from matplotlib.animation import FuncAnimation, ImageMagickWriter
import do_mpc
import pickle

# 1. Load the simulation data
# Ensure 'sim_data.pkl' was saved by your main.py
try:
    with open('sim_data.pkl', 'rb') as f:
        sim_data = pickle.load(f)
except FileNotFoundError:
    print("Error: 'sim_data.pkl' not found. Please ensure main.py saves the mpc.data object.")
    exit()

# 2. Configure Matplotlib style
rcParams['axes.grid'] = True
rcParams['font.size'] = 14

# 3. Setup Graphics object
mpc_graphics = do_mpc.graphics.Graphics(sim_data)
fig, ax = plt.subplots(5, sharex=True, figsize=(12, 10))

# --- ADDING THE SAFETY LIMIT LINE ---
# This draws a red line at 365.15K (363.15 + 2.0 temperature range)
ax[0].axhline(y=365.15, color='r', linestyle='--', label='Relief Limit')
ax[0].legend(loc='upper right')

# 4. Map variables to axes
mpc_graphics.add_line(var_type='_x', var_name='T_R', axis=ax[0])
mpc_graphics.add_line(var_type='_x', var_name='accum_monom', axis=ax[1])
mpc_graphics.add_line(var_type='_u', var_name='m_dot_f', axis=ax[2])
mpc_graphics.add_line(var_type='_u', var_name='T_in_M', axis=ax[3])
mpc_graphics.add_line(var_type='_u', var_name='T_in_EK', axis=ax[4])

# Labels
ax[0].set_ylabel('T_R [K]')
ax[1].set_ylabel('acc. monom')
ax[2].set_ylabel('m_dot_f')
ax[3].set_ylabel('T_in_M [K]')
ax[4].set_ylabel('T_in_EK [K]')
ax[4].set_xlabel('time')
fig.align_ylabels()

# 5. Define animation update function
def update(t_ind):
    print(f'Writing frame: {t_ind}', end='\r')
    mpc_graphics.plot_results(t_ind=t_ind)
    mpc_graphics.plot_predictions(t_ind=t_ind)
    mpc_graphics.reset_axes()
    return mpc_graphics.result_lines.full

# 6. Save the animation
print("Starting animation generation...")
n_steps = sim_data['_time'].shape[0]
anim = FuncAnimation(fig, update, frames=n_steps, blit=True)

# Save as a GIF
try:
    gif_writer = ImageMagickWriter(fps=5)
    anim.save('anim_poly_batch.gif', writer=gif_writer)
    print("\nAnimation successfully generated as 'anim_poly_batch.gif'.")
except Exception as e:
    print(f"\nError saving animation: {e}")
    print("Ensure ImageMagick is installed and added to your system PATH.")
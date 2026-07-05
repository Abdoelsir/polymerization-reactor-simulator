# smoke_test.py
import streamlit as st

st.title("System Verification")
st.write("If you can see this, your Streamlit environment is correctly configured.")

if st.button("Click to Test"):
    st.success("Verification successful! We are ready to proceed.")
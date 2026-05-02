#!/usr/bin/env python3
"""Convenience launcher. Run from repo root: python run.py"""
import sys, os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "app"))
from app import app

if __name__ == "__main__":
    app.run(debug=True, port=5000)

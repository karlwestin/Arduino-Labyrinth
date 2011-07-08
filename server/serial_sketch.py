#!/usr/bin/env python

import serial 
import math
import sys, re

SERIAL_DEVICE = "/dev/tty.usbmodem411"
BAUD_RATE = 9600

# converting Accelerometer angle range
# to inclination range relevant for the
# servo motors (see Arduino script)
min_angle = -45
max_angle = 45
min_send_angle = 0
max_send_angle = 180

#control characters corresponding to those
#chosen in arduino script, to select axis to
#set angle for.
YAXIS = chr(255)
XAXIS = chr(254)
    
# function to send an angle pair to the Arduino
def sendAngles(xaxis, yaxis):
    ser.write(XAXIS)
    ser.write(chr(xaxis))
    ser.write(YAXIS)
    ser.write(chr(yaxis))

# function to remap an angle received from stdin
# to an angle on the servo motor range:
def setLimits(angle):
    if angle > max_angle:
        angle = max_angle
    elif angle < min_angle:
        angle = min_angle
    angle = (angle - min_angle)/(max_angle - min_angle) * \
    (max_send_angle - min_send_angle)
    return int(math.floor(angle))
    
def roundAngles(beta, gamma):
    return (setLimits(beta), setLimits(gamma))

# serial connection to send to the arduino
ser = serial.Serial(SERIAL_DEVICE, BAUD_RATE)
# regexp syntax to extract coordinates from an input line:
syntax = "\(? *(-?\d+\.?\d*) *; *(-?\d+\.?\d*) *\)?"

while True:
    inp = sys.stdin.readline()
    mtch = re.search(syntax, inp)
    if mtch:
        beta = float(mtch.group(1))
        gamma = float(mtch.group(2))
        xangle, yangle = roundAngles(beta, gamma)
        print "beta:", beta, xangle
        print "gamma:", gamma, yangle
        sendAngles(xangle, yangle)
    else:
        print "incorrect input:", inp

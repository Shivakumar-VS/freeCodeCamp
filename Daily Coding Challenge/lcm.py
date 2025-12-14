# ** start of main.py **

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    return abs(a * b) //gcd(a,b)
# ** end of main.py **


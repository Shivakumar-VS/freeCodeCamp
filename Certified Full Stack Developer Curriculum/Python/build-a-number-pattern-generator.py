** start of main.py **

def number_pattern(n):
    if not isinstance(n, int):
        return "Argument must be an integer value."
    if n <= 0:
        return "Argument must be an integer greater than 0."
    return ' '.join(map(str, range(1, n + 1)))



** end of main.py **


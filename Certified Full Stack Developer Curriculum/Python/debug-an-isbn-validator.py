

def validate_isbn(isbn, length):
    if length == 10:
        if not isbn[:-1].isdigit() or not (isbn[-1].isdigit() or isbn[-1] == 'X'):
            print("Invalid character was found.")
            return
    else:  # length 13
        if not isbn.isdigit():
            print("Invalid character was found.")
            return

    # Check correct length
    if len(isbn) != length:
        print(f'ISBN-{length} code should be {length} digits long.')
        return

    # Split digits and check digit
    main_digits = isbn[:-1]          # all except last
    given_check_digit = isbn[-1]     # last character
    main_digits_list = [int(digit) for digit in main_digits]

    # Select which calculation to use
    if length == 10:
        expected_check_digit = calculate_check_digit_10(main_digits_list)
    else:
        expected_check_digit = calculate_check_digit_13(main_digits_list)

    # Compare check digits
    if given_check_digit == expected_check_digit:
        print("Valid ISBN Code.")
    else:
        print("Invalid ISBN Code.")


def calculate_check_digit_10(main_digits_list):
    digits_sum = 0
    for index, digit in enumerate(main_digits_list):
        digits_sum += digit * (10 - index)

    result = 11 - digits_sum % 11

    if result == 11:
        return "0"
    elif result == 10:
        return "X"
    else:
        return str(result)


def calculate_check_digit_13(main_digits_list):
    digits_sum = 0
    for index, digit in enumerate(main_digits_list):
        if index % 2 == 0:
            digits_sum += digit * 1
        else:
            digits_sum += digit * 3

    result = 10 - digits_sum % 10
    return "0" if result == 10 else str(result)


def main():
    user_input = input("Enter ISBN and length: ")

    # ------------------------------------------------------
    # CHANGE #2 (Requirement 6):
    # If user does NOT enter a comma → print:
    #   "Enter comma-separated values."
    #
    # This FIXES Failed Test 6.
    # ------------------------------------------------------
    if "," not in user_input:
        print("Enter comma-separated values.")
        return

    values = user_input.split(",")

    # Also handle cases with too few/many values
    if len(values) != 2:
        print("Enter comma-separated values.")
        return

    isbn = values[0].strip()
    length_str = values[1].strip()

    # ------------------------------------------------------
    # CHANGE #3 (Requirement 7):
    # Check if length is numeric:
    #   - If not numeric → print "Length must be a number."
    # ------------------------------------------------------
    if not length_str.isdigit():
        print("Length must be a number.")
        return

    length = int(length_str)

    # Only accept lengths 10 or 13
    if length not in (10, 13):
        print("Length should be 10 or 13.")
        return

    validate_isbn(isbn, length)


# Uncomment to run manually:
# main()




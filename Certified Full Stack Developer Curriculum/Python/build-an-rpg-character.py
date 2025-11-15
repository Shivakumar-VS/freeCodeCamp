** start of main.py **

full_dot = '●'
empty_dot = '○'

def create_character(name, strength, intelligence, charisma):
    if not isinstance(name, str):
        return "The character name should be a string"
    if len(name) > 10:
        return "The character name is too long"
    if " " in name:
        return "The character name should not contain spaces"
    

    stats = [strength, intelligence, charisma]

    if not all(isinstance(s, int) for s in stats):
        return "All stats should be integers"

    if any(s < 1 for s in stats):
        return "All stats should be no less than 1"

    if any(s > 4 for s in stats):
        return "All stats should be no more than 4"

    if sum(stats) != 7:
        return "The character should start with 7 points"

    def make_line(label, value):
        return f"{label} " + "●" * value + "○" * (10 - value)

    result = (
        name + "\n" +
        make_line("STR", strength) + "\n" +
        make_line("INT", intelligence) + "\n" +
        make_line("CHA", charisma)
    )

    return result

** end of main.py **


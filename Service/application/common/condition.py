class Condition:

    def __init__(self, column, operator, value):
        self.column = column
        self.operator = operator
        self.value = value
        
    def to_sql_condition(self):
        return "%s %s '%s'" % (self.column, self.operator, self.value)

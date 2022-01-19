# SUBLEQ-Interpreter
subleq or subtract and branch if less-than or equal to zero, is a single instruction, turing complete language.

This is an interpretor that can run the code.

Format:

subleq A, B, C

A and B are memory addresses to subtract from, and C is the memory address for the conditional jump

Additional interpretation:
to make writing the code simpler, the .data and flags (via @flagName:) are added
- .data sets the data at that spot in memory to the given value
- flags give a name to memory addresses

Example Code (adds A and B and stores in C):

```
subleq @z, @a, 3
subleq @z, @b, 6
subleq @c, @z, 9
subleq @z, @z, 9

@z: .data 0
@a: .data 2
@b: .data 4
@c: .data 0
```

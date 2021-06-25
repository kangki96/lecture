# import string

# def caesar(s,n):
#     result = ""
#     base = ""
#     for c in s:
#         if c in string.ascii_lowercase:
#             base = string.ascii_lowercase
#         elif c in string.ascii_uppercase:
#             base = string.ascii_uppercase
#         else:
#             result+=c
#             continue
#         a = base.index(c)+n
#         result+=base[a%len(base)]
#     return result


# print('s는 "a B z", n은 4인 경우:'+caesar("a B z",4))


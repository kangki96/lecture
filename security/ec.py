from tinyec.ec import SubGroup, Curve
import matplotlib.pyplot as plt
g={"x":15, "y":13}
field = SubGroup(p=17, g=(15,13), n=18, h=1)
curve =Curve(a=0, b=7, field=field, name='p17')
for k in range(0,25):
    p=k*curve.g
    print(f"{k}*G = ({p.x},{p.y}")
    if p.x!=None and p.y!=None and k<=17:
        plt.plot(p.x, p.y, 'ro')
        plt.text(p.x, p.y, '{}*G=({},{})'.format(k, p.x, p.y))
plt.show()
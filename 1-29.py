even_numbers = []
for i in range(10):
    if i % 2 == 0:
        even_numbers.append(i)

num_list = [1,3,5,6,7,8,10,13]
mult_by_three = []
for i in num_list:
    mult_by_three.append(i*3)

square_numbers = []
for i in range(10):
    square_numbers.append(i*i)

nums = [1,1,3,3,2,2,4,5,5,7,1,1]
nums_set = set()
for i in nums:
    nums_set.add(i)

#iterators
a=[4,5,7,8,1,9,10]
a2 = {
    "a": 123,
    "b": 456,
    "c": 567,
}
print(a)
for i in a:
    print(i)
i_a=iter(a)
print(type(i_a))
print(i_a)
print(next(i_a))
print(next(i_a))

i_a2=iter(a2)
print(next(i_a2))

class my_Iter:
    def __init__(self, n):
        self.i=0
        self.n=n
    def __iter__(self):
        return (self)
    def __next__(self):
        if self.i < self.n:
            i = self.i
            self.i+=1
            return i
        else:
            raise (StopIteration)

i_i = my_Iter(7)
print(i_i)
print(next(i_i))

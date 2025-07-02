The solution

- An implementation of the DST
- Code is minimalistic
- Performs arithmentic operations
- Implements recursion (method calling itself) when performing 'evaluate()', more descriptively: it uses depth first migration first from the left nodes and later the right nodes. The final calculation is performed at the root.
- Operations are perform on 'leaves' between the node containing the operation. if the 'leaf' is a subnode containing another BinaryOperation (and beyond), then the recursive flow will collect that answer and return it to the calling 'evaluate'.




Bonus assignments I did

- printing the full expression in Euclidean form, using same recursive technique
- Serializing the object in JSON format, similiarily to print() and evaluate(), Though the protocol must be invoked using JSON.stringify('name_of_ast').
- error handling for division by zero, and invalid operators

Bonus assignments I missed
- Comparator operations. I had an early version previously during testing, but opted to remove it. I've had a hard time reconciling with the prospect of combining Binary Operations with Comparators. I've thought of using backtracking, and changing the evaluation signature to a union of 'boolean | number'. Also changing some methods to abstract types. Was taking too long, so I abandoned it.


How I worked.
* Read up on AST's for research,
* Pen and paper to facilitate how I should proceed.
* I'm familiar with depth-first recursion especially from school, but needed bring myself up to speed with research.
* Utilized a lot of testing vis-a-vis, breakpoints during testing.




What I used AI for

* Scaffolding tsconfig and testing code with jest (also testcases) as well as generating launch.json to help me enable running
the code in debug mode with breakpoints. 

* genererating custom errors.

* occasional bug fixes

* generating annotation of classes/interfaces.


Further improvement recommendations:

* Conversion of Euclidean expression in string form to AST format with the help of parenthesis in the string.

* Implementation of the comparators

* More thoroughness with error handling

* Updating the print() so that it dynamically inserts paranthesis



    


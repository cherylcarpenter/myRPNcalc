## How to run

This implementation utilizes node.js

### Prereqs

To install node.js, either download or install using brew

```bash
brew install node
```

To install the node modules:

```bash
npm install
```

### Run from command line

From the root of the project, run:

```bash
Node .
```

The calulator will accept recursive inputs, or inline inputs, until the node terminal is ended.

#### Example Calculations in RPN

    > 5
    5
    > 8
    8
    > +
    13

---

    > 5 5 5 8 + + -
    -13.0
    > 13 +
    0.0

---

    > -3
    -3.0
    > -2
    -2.0
    > *
    6.0
    > 5
    5.0
    > +
    11.0

---

    > 5
    5
    > 9
    9
    > 1
    1
    > -
    8
    > /
    0.625

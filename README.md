# stable-marriage
Node.js implementation of the Stable Marriage Problem (SMP).
Generates a random instance of the problem (default
size: 20 persons of each gender) and solves it using the
 [Gale-Shapley algorithm](https://en.wikipedia.org/wiki/Stable_marriage_problem#Algorithm).

The script logs the process of matching partners in a
dialogue-style manner, for presenting it to an audience
and, well, for the funsies. Like this:

![Screenshot of the Mac terminal](./assets/screen-output.png)

## Remark

I am very well aware of how stereotypical the man/woman
terminology is. The SMP is a decade-old
theoretical construct, and well, times were different. For
reasons of clear data structuring and because the problem
is best known under the man/woman couple analogy, I stick
to the outmoded labels, whilst strongly supporting
diversity in any way. <3

## Usage

Start the script by hitting `npm start` in the project directory.

You can pass an optional argument `n=<size>`, where `<size>`
 is the number of couples to be generated. For example

```
$ npm start n=25
```

will generate an instance with 25 women and 25 men, each
of them having their own priority list with 25 entries,
resulting in 25 couples.

**Careful!** Time complexity of the Gale-Shapley
algorithm is O(n^2). I'd recommend not using any n > 400.

## Requires

- Node.js version 6.2.2
- a terminal that supports emojis
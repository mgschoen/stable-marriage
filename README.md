# stable-marriage
Node.js implementation of the stable marriage problem.
Generates a random instance of the problem (default
size: 20 persons of each gender) and solves it using the
 [Gale-Shapley-algorithm](https://en.wikipedia.org/wiki/Stable_marriage_problem#Algorithm).

The script logs the process of matching partners in a
dialogue-style manner, for presenting it to an audience
and, well, for the funsies. Like this:

![Screenshot of the Mac terminal](./assets/screen-output.png)

## Remark

I am very well aware of how stereotypical the man/woman
terminology is. The stable marriage problem is a decade-old
theoretical construct, and well, times were different. For
reasons of clear data structuring and because the problem
is best known under the man/woman couple analogy, I stick
to the outmoded labels, whilst strongly supporting
diversity in any way. <3

## Usage

Start the script by hitting `npm start` in the project directory.

## Requires

- Node.js version 6.2.2
- a terminal that supports emojis
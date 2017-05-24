## Website Performance Optimization project
The source code is in the root foloder, while the production code is in the `dist` folder.
### Part 0: How to run
1. Check out the repository.
2. You can run a local server.
```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
```
3. Open a browser and visit `localhost:8000`.

#### Part 1: Optimize PageSpeed Insights score for index.html
Here is a list explaining what I've done to get a higher score for `index.html`
1. Resize the picture: `views/images/pizzeria.jpg`. Now it has two versions, bigger one(633 pixels * 474 pixels) for `pizza.html`, smaller one(100 pixels * 75 pixels) for index.html.
2. Minify the pictures, using [TinyPng](https://tinypng.com/).
3. Load google fonts asychronously using web font loader.
4. Use media queries to remove render blocking css. In detail, one css file for all and one for mobiles(max-width: 480px) and one for print.
5. Use `media:none` to remove render blocking css file `style.css`.
6. Add `async` to scripts.
7. Minify css files and js files using gulp and the relative production code is in `dist` folder.

### Part 2: Optimize Frames per Second in pizza.html
#### scroll problem
Modify the code in function `updatePositions`, get the `scrollPosition` out of the loop. At the same time, move the pizzas using  `items[i].style.transform = "translateX(" + temp + ")"` instead of `items[i].style.left = ...` to avoid repainting the pizzas.
#### resize pizza problem
Modify the code in function `changeSliderLabel(size)`. In detail, `determineDx` function is deleted and in function `changePizzaSizes(size)`, remove the forced synchronous layout before. 

### Part 3: run gulp
1. run `npm install` to install the modules.
2. run `gulp` to minify css ang js files.





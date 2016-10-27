# morph-drawable-to-xX


##HowTO

  1. npm i
  2. put drawable-XXXXX folders to /source directory
  3. npm start
  4. get result from /result directory


##What is this

This is script that converts following structure:
```
  /
    drawable-mdpi
      file-name-1.ext
      file-name-2.ext
    drawable-hdpi
      file-name-1.ext
      file-name-2.ext
    drawable-xhdpi
      file-name-1.ext
      file-name-2.ext
    drawable-xxhdpi
      file-name-1.ext
      file-name-2.ext
    drawable-xxxhdpi
      file-name-1.ext
      file-name-2.ext
```

Into following:
```
  /
    file-name-1
      x1.ext
      x1.5.ext
      x2.ext
      x3.ext
      x4.ext
    file-name-2
      x1.ext
      x1.5.ext
      x2.ext
      x3.ext
      x4.ext
```

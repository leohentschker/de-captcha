# DeCAPTCHA
I started this project with two goals in mind. First, I wanted to get a better understanding of how IPFS works. I absolutely love what Protocol Labs is doing and wanted to check out some of the products they've built first hand. Secondly, I wanted to explore the difficulties surrounding rolling my own CAPTCHA implementation. I recently watched Luis von Ahn's [Ted Talk](https://www.youtube.com/watch?v=-Ht4qiDRZE8) and was blown away by the sheer impact that he and the ReCAPTCHA team were able to have.


Combining these two goals, I built DeCAPTCHA: a free image hosting service on IPFS that requires users to solve a CAPTCHA puzzle before uploading their images.

## Why have users solve CAPTCHA puzzles before uploading their own images?
I chose this design pattern for two reasons. The first comes down to cost savings. In order for content to be stored on IPFS, it must be stored on disk somewhere (right now I'm storing it on a series of AWS instances). Therefore, in order to ensure that I won't go bankrupt from storage costs, I wanted to introduce a mechanism that made it slightly more difficult to upload new pictures.


Secondly, following the lead of ReCAPTCHA, I think that adding in a CAPTCHA component is a fantastic opportunity to add some real value to the developer community. By forcing users to label a series of images before uploading, I can build up a tagged image dataset that can be used for different computer vision tasks. Furthermore, as users upload more images, the tagged dataset can grow even bigger!

## How is this implemented?
The client is a standard React app and the backend is a Django client. I'm using the [py-ipfs-api](https://github.com/ipfs/py-ipfs-api) to interact with IPFS on the backend.

## Where are all these initial images from?
The database was initially populated with pictures from [VISUALGENOME](http://visualgenome.org/). By pulling tags provided in the metadata, I was able to pre-populate the database with a collection of 1000 images that already came with a set of coherent labels.

import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
//import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

import sharp from 'sharp';
import Image from '@11ty/eleventy-img';

const GALLERY_IMAGE_WIDTH = 192;
const LANDSCAPE_LIGHTBOX_IMAGE_WIDTH = 2000;
const PORTRAIT_LIGHTBOX_IMAGE_WIDTH = 720;



export default function (eleventyConfig) {
	// Output directory: _site

	// Copy `img/` to `_site/img/`
	eleventyConfig.addPassthroughCopy("img");
  	// Copy `js/` to `_site/js/`
	eleventyConfig.addPassthroughCopy("js");

	// Copy any .jpg file to `_site`, via Glob pattern
	// Keeps the same directory structure.
	eleventyConfig.addPassthroughCopy("**/*.jpg");
	
	// Watch CSS files
	eleventyConfig.addWatchTarget("**/*.css");
	
  // copy `css/` to `_site/css/`
	eleventyConfig.addPassthroughCopy("css");
	
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	
  eleventyConfig.addLiquidShortcode('galleryImage', galleryImageShortcode);
  eleventyConfig.addPairedLiquidShortcode('gallery', galleryShortcode);
};


function galleryShortcode(content, name) {
    return `
        <div>
            <div class="gallery" id="gallery-${name}">
                ${content}
            </div>
            <script type="module">
                import PhotoSwipeLightbox from '/js/photoswipe-lightbox.esm.min.js';
                import PhotoSwipe from '/js/photoswipe.esm.min.js';
                const lightbox = new PhotoSwipeLightbox({
                    gallery: '#gallery-${name}',
                    children: 'a',
                    pswpModule: PhotoSwipe,
                    preload: [1, 1]
                });
                lightbox.init();
            </script>
        </div>
    `.replace(/(\r\n|\n|\r)/gm, "");
}

async function galleryImageShortcode(src, alt) {
    let lightboxImageWidth = LANDSCAPE_LIGHTBOX_IMAGE_WIDTH;

    const metadata = await sharp(src).metadata();
    // if (metadata.orientation > 1) {
        // console.log('Rotated image detected:', src, metadata.orientation);
        // await sharp(src).rotate().toFile(`correct/${src.split("/").pop()}`);
    // }

    if(metadata.height > metadata.width) {
        lightboxImageWidth = PORTRAIT_LIGHTBOX_IMAGE_WIDTH;
    }

    const options = {
        formats: ['jpeg'],
        widths: [GALLERY_IMAGE_WIDTH, lightboxImageWidth],
        urlPath: "/gen/",
        outputDir: './_site/gen/'
    }

    const genMetadata = await Image(src, options);

    return `
        <a href="${genMetadata.jpeg[1].url}" 
        data-pswp-width="${genMetadata.jpeg[1].width}" 
        data-pswp-height="${genMetadata.jpeg[1].height}" 
        target="_blank">
            <img src="${genMetadata.jpeg[0].url}" alt="${alt}" />
        </a>
    `.replace(/(\r\n|\n|\r)/gm, "");;
}
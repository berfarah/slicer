import Jimp from "jimp";
import path from "path";
import log from "./logger";

class Slicer {
  constructor(path, derivatives) {
    this.path = path;
    this.derivatives = derivatives;
  }

  _filename(suffix) {
    const ext = path.extname(this.path);
    const dir = path.dirname(this.path);
    const basename = path.basename(this.path, ext);

    return path.join(dir, `${basename}${suffix || ""}${ext}`);
  }

  _calculateSize(dimensions) {
    const [topLeft, bottomRight] = dimensions;

    return bottomRight.map((coordinate, index) => (
      coordinate - topLeft[index]
    ));
  }

  _cropAndSave(dimensions, filename) {
    const [x, y] = dimensions[0];
    const [w, h] = this._calculateSize(dimensions);

    return Jimp.read(this.path).then((image) => {
      image.crop(x, y, w, h);
      image.write(filename);
    });
  }

  slice() {
    const dims = this.derivatives;
    const promises = Object.keys(dims).map((key) => {
      const dimensions = dims[key];
      const filename = this._filename(`-${key}`);

      return this._cropAndSave(dimensions, filename).then(() => {
        log.info(`Cut derivative ${key}, saving to ${filename}`);
        return filename;
      }, (err) => {
        log.error(err);
        return err;
      });
    });

    return Promise.all(promises)
  }
}

export default Slicer;

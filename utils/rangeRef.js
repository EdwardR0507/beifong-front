export default class RangeRef {
  constructor() {
    this.updateRect()

    const update = (evt, hide) => {
      const selection = document.getSelection()

      this.range = selection && selection.rangeCount && selection.getRangeAt(0)

      this.updateRect(hide)
    }

    window.addEventListener("scroll", update)
    document.scrollingElement.addEventListener("scroll", update)
  }

  updateRect(hide) {
    if (!hide && this.range) {
      this.rect = this.range.getBoundingClientRect()
    } else {
      this.rect = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
      }
    }

    this.rectChangedCallback(this.rect)
  }

  rectChangedCallback() {
    // Abstract to be implemented
  }

  getBoundingClientRect() {
    return this.rect
  }

  get clientWidth() {
    return this.rect.width
  }

  get clientHeight() {
    return this.rect.height
  }
}

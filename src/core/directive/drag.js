export default Vue => {
    Vue.directive("drag", (el) => {
        el.style.position = "absolute"
        let canDrag = false
        let top = el.offsetTop
        let left = el.offsetLeft
        el.onmousedown = function() {
            canDrag = true
        }
        el.onmouseleave = function() {
            canDrag = false
        }
        el.onmouseup = function() {
            canDrag = false
        }
        el.onmousemove = function(e) {
            if(!canDrag) return
            top += e.movementY
            left += e.movementX
            el.style.top = top + "px"
            el.style.left = left + "px"
        } 
    })
}
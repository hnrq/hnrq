import * as debounce from "./debounce"
// @ponicode
describe("debounce.default", () => {
    test("0", () => {
        let callFunction: any = () => {
            debounce.default("callback detected, not supported yet", 5.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            debounce.default("callback detected, not supported yet", true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            debounce.default("bc23a9d531064583ace8f67dad60f6bb", false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            debounce.default("callback detected, not supported yet", 1000)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            debounce.default("callback detected, not supported yet", 0.0001)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            debounce.default("", -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

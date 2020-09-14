import { Instance, types } from "mobx-state-tree"
import { MockEnvironment } from "../../test/models/mock-environment"
import { lookupReference, maybeReference } from "./model-types"
import { Environment } from "../models/environment"

const env = MockEnvironment()
const TestChildModel = types.model("TestChild").props({ id: types.identifier, name: types.string })

type TestChild = Instance<typeof TestChildModel>

describe("lookupReference", () => {
  describe("prop", () => {
    const TestParentModel = types
      .model("TestParent")
      .props({
        ref: lookupReference(TestChildModel, (id: string, env: Environment) => {
          return TestChildModel.create({ id, name: `${id} - name` })
        }),
      })
      .actions(self => ({
        setRef(id?: string) {
          self.ref = id as any
        },
      }))

    test("create", () => {
      expect(TestParentModel.create({ ref: "exists" }, env).ref).toEqual({
        id: "exists",
        name: "exists - name",
      })
    })
  })

  describe("wrapped in type-defs.maybe", () => {
    const TestParentModel = types
      .model("TestParent")
      .props({
        ref: types.maybe(
          lookupReference(TestChildModel, (id: string, env: Environment) => {
            return TestChildModel.create({ id, name: `${id} - name` })
          }),
        ),
      })
      .actions(self => ({
        setRef(id?: string) {
          self.ref = id as any
        },
      }))

    describe("create", () => {
      it("defaults undefined", () => {
        expect(TestParentModel.create({}, env).ref).toBeUndefined()
      })
      it("may be set", () => {
        expect(TestParentModel.create({ ref: "exists" }, env).ref).toEqual({
          id: "exists",
          name: "exists - name",
        })
      })
    })
    describe("set", () => {
      let parent: Instance<typeof TestParentModel>
      beforeEach(() => (parent = TestParentModel.create({})))

      it("can set to undefined", () => {
        parent.setRef(undefined)
        expect(TestParentModel.create({}, env).ref).toBeUndefined()
      })
      it("can set to valid", () => {
        parent.setRef("id1")
        expect(parent.ref).toEqual({
          id: "id1",
          name: "id1 - name",
        })
      })
    })
  })
})

describe("maybeReference", () => {
  describe("prop", () => {
    const TestParentModel = types
      .model("TestParent")
      .props({
        ref: maybeReference(TestChildModel),
      })
      .actions(self => ({
        setRef(id: string | TestChild) {
          self.ref = id as any
        },
      }))

    const TestStoreModel = types
      .model("TestStore")
      .props({ children: types.map(TestChildModel), parent: types.maybe(TestParentModel) })
      .actions(self => ({
        setParent: (parent: any) => (self.parent = parent),
      }))

    let store: Instance<typeof TestStoreModel>

    beforeEach(() => {
      store = TestStoreModel.create({
        children: {
          id1: { id: "id1", name: "Test 1" },
          id2: { id: "id2", name: "Test 2" },
          id3: { id: "id3", name: "Test 3" },
        },
      })
    })

    describe("create", () => {
      it("resolves to undefined", () => {
        expect(TestParentModel.create({ ref: "id2" }).ref).toBeUndefined()
      })
      it("resolves if attached to the tree", () => {
        const parent = TestParentModel.create({ ref: "id2" })
        store.setParent(parent)
        expect(parent.ref).toEqual(store.children.get("id2"))
      })
    })

    describe("set", () => {
      it("can be set to something that exists", () => {
        const parent = TestParentModel.create({ ref: "id2" })
        store.setParent(parent)
        parent.setRef("id3")
        expect(parent.ref).toEqual(store.children.get("id3"))
      })
      it("can be set to something that does not resolve", () => {
        const parent = TestParentModel.create({ ref: "id2" })
        store.setParent(parent)
        parent.setRef("id4")
        expect(parent.ref).toBeUndefined()
      })
      it("can be set to the value of the child", () => {
        const parent = TestParentModel.create({ ref: "id2" })
        store.setParent(parent)
        const child = store.children.get("id1")!
        parent.setRef(child)
        expect(parent.ref).toEqual(child)
      })
    })
  })
  describe("wrapped in type-defs.maybe", () => {
    const TestParentModel = types
      .model("TestParent")
      .props({
        ref: types.maybe(maybeReference(TestChildModel)),
      })
      .actions(self => ({
        setRef(id?: string | TestChild) {
          self.ref = id as any
        },
      }))

    const TestStoreModel = types
      .model("TestStore")
      .props({ children: types.map(TestChildModel), parent: types.maybe(TestParentModel) })
      .actions(self => ({
        setParent: (parent: any) => (self.parent = parent),
      }))

    let store: Instance<typeof TestStoreModel>

    beforeEach(() => {
      store = TestStoreModel.create({
        children: {
          id1: { id: "id1", name: "Test 1" },
          id2: { id: "id2", name: "Test 2" },
          id3: { id: "id3", name: "Test 3" },
        },
      })
    })

    describe("create", () => {
      it("defaults, unattached, undefined", () => {
        expect(TestParentModel.create({}).ref).toBeUndefined()
      })
      it("defaults, attached, undefined", () => {
        const parent = TestParentModel.create({})
        expect(parent.ref).toBeUndefined()
      })
      it("set, resolves to undefined", () => {
        expect(TestParentModel.create({ ref: "id2" }).ref).toBeUndefined()
      })
      it("set, resolves if attached to the tree", () => {
        const parent = TestParentModel.create({ ref: "id2" })
        store.setParent(parent)
        expect(parent.ref).toEqual(store.children.get("id2"))
      })
    })

    describe("set", () => {
      it("can be set to something that exists", () => {
        const parent = TestParentModel.create({ ref: "id2" })
        store.setParent(parent)
        parent.setRef("id3")
        expect(parent.ref).toEqual(store.children.get("id3"))
      })
      it("can be set to something that does not resolve", () => {
        const parent = TestParentModel.create({ ref: "id2" })
        store.setParent(parent)
        parent.setRef("id4")
        expect(parent.ref).toBeUndefined()
      })
      it("can be set to the value of the child", () => {
        const parent = TestParentModel.create({ ref: "id2" })
        store.setParent(parent)
        const child = store.children.get("id1")
        parent.setRef(child)
        expect(parent.ref).toEqual(child)
      })
      it("can be set to undefined", () => {
        const parent = TestParentModel.create({ ref: "id2" })
        store.setParent(parent)
        parent.setRef(undefined)
        expect(parent.ref).toBeUndefined()
      })
    })
  })
})

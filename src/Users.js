export let idCount = 4

export const adaptBody = ({name, email}) => {
    idCount = idCount + 1
    return {
        id: idCount,
        name: name,
        email: email
    }
}

export const users = [
    {
      id: 1,
      name: "John",
      email: "john@gmail.com"
    },
    {
      id: 2,
      name: "Smith",
      email: "smith@gmail.com"
    },
    {
      id: 3,
      name: "Chris",
      email: "chris@gmail.com"
    },
    {
      id: 4,
      name: "Jack",
      email: "jack@gmail.com"
    }
  ];
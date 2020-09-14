import {
  ZipCodeValidator,
  RequiredValidator,
  EmailValidator,
  MinLengthValidator,
  MaxLengthValidator,
  VanityUrlValidator,
  OnlyNumbersValidator,
  PasswordComplexityValidator,
} from "../validators"
import _ from "lodash"

// RequiredValidator --------------------------------------
describe("RequiredValidator - valid entries", () => {
  const testValues = [" ", "C", "This is a really long string with stuff like !%*#%& in it!"]

  test.each(testValues)("%s", async value => {
    const result = await RequiredValidator(value)

    expect(result).toBeDefined
  })
})

describe("RequiredValidator - invalid entries", () => {
  const testValues = [undefined, ""]

  test.each(testValues)("%s", async value => {
    return await expect(RequiredValidator(value)).rejects.toThrow(Error)
  })
})

// ZipCodeValidator --------------------------------------
describe("ZipCodeValidator - valid entries", () => {
  for (let i = 0; i <= 9; i++) {
    const five_digit = _.repeat(i.toString(), 5)
    const nine_digit = five_digit + "-" + _.repeat(i.toString(), 4)

    // 00000...99999 and 00000-0000...99999-9999
    test.each([five_digit, nine_digit])("%s", async value => {
      const result = await ZipCodeValidator(value)

      expect(result).toBeDefined
    })
  }
})

describe("ZipCodeValidator - invalid entries", () => {
  const testValues = [
    "1234",
    "53242-123",
    "642703",
    "125775-9077",
    "99765-13590",
    "382719383",
    "-5643",
    "22322-",
    "A9765-13590",
    "9b765-13590",
    "99#65-13590",
    "997d5-13590",
    "9976E-13590",
    "99765-<3590",
    "99765-1@590",
    "99765-13x90",
    "99765-1359U",
    "A9765",
    "9b765",
    "99#65",
    "997d5",
    "9976E",
  ]

  test.each(testValues)("%s", async value => {
    await expect(ZipCodeValidator(value)).rejects.toThrow(Error)
  })
})

// EmailValidator: --------------------------------------
// This is not a complete set, since that would be too large
describe("EmailValidator - valid entries, prefix", () => {
  const testValues = [
    "a@example.com",
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&{*+-/=?@example.com", // Max length is 64
    "a^_`'|0123456789@example.com",
  ]

  test.each(testValues)("%s", async value => {
    const result = await EmailValidator(value)

    expect(result).toBeDefined
  })
})

describe("EmailValidator - invalid entries, prefix", () => {
  const testValues = [
    "@example.com",
    "+@example.com", // Cannot start with special char
    //'ABC*|123@example.com', // Two special chars in a row, currently not checked
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abc@example.com", // One over max length
    "a<@example.com",
    "a>@example.com",
    "a(@example.com",
    "a)@example.com",
    "a[@example.com",
    "a]@example.com",
    "a.@example.com",
    "a,@example.com",
    "a;@example.com",
    "a:@example.com",
    "a@@example.com",
  ]

  test.each(testValues)("%s", async value => {
    await expect(EmailValidator(value)).rejects.toThrow(Error)
  })
})

describe("EmailValidator - valid entries, ip suffix", () => {
  // x.x.x.x ... xxx.xxx.xxx.xxx
  for (let numDigits = 1; numDigits < 4; numDigits++) {
    // 0...9 for each digit in the above pattern
    for (let i = 0; i <= 9; i++) {
      const digits = _.repeat(i.toString(), numDigits)
      const testValue = "test@" + digits + "." + digits + "." + digits + "." + digits

      test(testValue, async () => {
        const result = await EmailValidator(testValue)

        expect(result).toBeDefined
      })
    }
  }
})

describe("EmailValidator - invalid entries, ip suffix", () => {
  const testValues = [
    "test@.1.2.3", // Too few digits in section
    "test@4..5.6.7",
    "test@8.9..0.11",
    "test@12.13.143.",
    "test@1.2.3", // Too few sections
    "test@4.5.6.7.", // Too may sections
    "test@8.9..0.11",
    "test@12.13.143.",
    "test@1234.1.11.111", // Too many digits in section
    "test@1.4323.11.111",
    "test@1.43.9872.352",
    "test@3.53.123.3532",
    "test@B32.12.34.123", // Invalid characters in each place
    "test@B32.12.34.123",
    "test@3a2.12.34.123",
    "test@33#.12.34.123",
    "test@132.d2.34.123",
    "test@132.1!.34.123",
    "test@132.12#.34.123",
    "test@132.12.R4.123",
    "test@132.12.3r.123",
    "test@132.12.34|.123",
    "test@132.12.34.Q23",
    "test@132.12.34.1b3",
    "test@B32.12.34.12,",
  ]

  test.each(testValues)("%s", async value => {
    await expect(EmailValidator(value)).rejects.toThrow(Error)
  })
})

describe("EmailValidator - valid entries, alpha suffix", () => {
  const testValues = [
    "test@a.bc", // Min section lengths and number of sections
    "test@abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.A-B.CDE.FGH.IJKLMNO-PQRS.TUV.WXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.abcdefghijklmnopqrstuvwxyzABCDEFGHIJK.jp", // Max len, lots of sections, all valid chars
    "test@abcde.fghi-jk.l.mn.opq.rstu.vwxyz.ABC-DEFG-HIJ.KL.M-N.OPQRS.TUVW.XYZ-0-1-2-3.456789.ab", // Many sections
  ]

  test.each(testValues)("%s", async value => {
    const result = await EmailValidator(value)

    expect(result).toBeDefined
  })
})

describe("EmailValidator - invalid entries, alpha suffix", () => {
  // No testin all invalid chars
  const testValues = [
    "test@.com", // Missing first section
    "test@something", // Must have 2+ sections
    "test@something.", // Must have end section
    "test@something..com", // Empty section
    "test@something.a", // End must have at least 2 chars
    "test@lotsofstuffin here#ab.com",
    "test@something.1co",
    "test@something.-co", // Dash is invalid in end section
    "test@abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.A-B.CDE.FGH.IJKLMNO-PQRS.TUV.WXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.abcdefghijklmnopqrstuvwxyzABCDEFGHIJK.gov", // Over max length
  ]

  test.each(testValues)("%s", async value => {
    await expect(EmailValidator(value)).rejects.toThrow(Error)
  })
})

describe("EmailValidator - invalid entries, general", () => {
  const testValues = [
    "test@", // No suffix
    "testsomething.com", // No @
  ]

  test.each(testValues)("%s", async value => {
    await expect(EmailValidator(value)).rejects.toThrow(Error)
  })
})

// SocialSecurityValidator -------------------------------
// Skipping since it is not used

// MinLengthValidator --------------------------------------
describe("MinLengthValidator - valid entries", () => {
  test.each`
    len   | value
    ${0}  | ${""}
    ${0}  | ${undefined}
    ${0}  | ${"dkei"}
    ${1}  | ${"a"}
    ${6}  | ${"adkdkdeaidDK #@&*(#*&(AD"}
    ${14} | ${"DK#* A818dm,a8"}
  `("$value with length $len", async ({ len, value }) => {
    const validator = MinLengthValidator(len)
    const result = await validator(value)

    expect(result).toBeDefined
  })
})

describe("MinLengthValidator - invalid entries", () => {
  test.each`
    len    | value
    ${1}   | ${""}
    ${1}   | ${undefined}
    ${2}   | ${"a"}
    ${233} | ${"adkdkdeaidDK #@&*(#*&(AD"}
    ${15}  | ${"DK#* A818dm,a8"}
  `("$value with length $len", async ({ len, value }) => {
    const validator = MinLengthValidator(len)

    await expect(validator(value)).rejects.toThrow(Error)
  })
})

// MaxLengthValidator --------------------------------------
describe("MaxLengthValidator - valid entries", () => {
  test.each`
    len     | value
    ${0}    | ${""}
    ${0}    | ${undefined}
    ${1}    | ${"a"}
    ${6}    | ${"adkdgr"}
    ${1455} | ${"DK#* A818dm,a8"}
  `("$value with length $len", async ({ len, value }) => {
    const validator = MaxLengthValidator(len)
    const result = await validator(value)

    expect(result).toBeDefined
  })
})

describe("MaxLengthValidator - invalid entries", () => {
  test.each`
    len   | value
    ${0}  | ${"e"}
    ${2}  | ${"aaa"}
    ${8}  | ${"adkdkdeaidDK #@&*(#*&(AD"}
    ${15} | ${"DK#* A818dm,a833"}
  `("$value with length $len", async ({ len, value }) => {
    const validator = MaxLengthValidator(len)

    await expect(validator(value)).rejects.toThrow(Error)
  })
})

// VanityUrlValidator --------------------------------------
describe("VanityUrlValidator - valid entries", () => {
  const testValues = [
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_", // Valid chars
    "3adfaIEdaf38347", // Can start with a number
    "O_", // Min length, can start with a capital
    "3B", // Min length, can start with a number
  ]

  test.each(testValues)("%s", async value => {
    const result = await VanityUrlValidator(value)

    expect(result).toBeDefined
  })
})

// Not all invalid characters will be tested
describe("VanityUrlValidator - invalid entries", () => {
  const testValues = [
    "",
    undefined,
    "a", // Too short
    "_dkdkdk", // Underline cannot be first char
    "zKD#KD", // Invalid char in middle
    "abcedd^", // INvalid char at end
    "{d83kd", // Start with non-alpha
  ]

  test.each(testValues)("%s", async value => {
    return await expect(VanityUrlValidator(value)).rejects.toThrow(Error)
  })
})

// OnlyNumbersValidator --------------------------------------
describe("OnlyNumbersValidator - valid entries", () => {
  const testValues = [
    "0123456789", // Valid chars
    "3", // Min number of digits
    "3851578913257812345789347589324589324589734573498519857819578901578903578905789758975897135897859718957", // Long number
    "",
    undefined,
  ]

  test.each(testValues)("%s", async value => {
    const result = await OnlyNumbersValidator(value)

    expect(result).toBeDefined
  })
})

// Not all invalid characters will be tested
describe("OnlyNumbersValidator - invalid entries", () => {
  const testValues = [
    "a33433", // Invalid at start, lowercase
    " ", // Whitespace
    "38374373A3837373", // Invalid in the middle, captial
    "38933838383$", // Invalid at the end, symbol
  ]

  test.each(testValues)("%s", async value => {
    return await expect(OnlyNumbersValidator(value)).rejects.toThrow(Error)
  })
})

// PasswordComplexityValidator --------------------------------------
// There are too many rules for valid/invalid passwords, so just testing a few arbitrary ones in each partition class
describe("PasswordComplexityValidator - valid entries", () => {
  const testValues = [
    "Th3!C8dkd9!#$addk",
    "ThisIsSomeReallyLongPasswordBecauseWhyNotSteamOfThoughtsHeyIsThatASandwich",
    "",
    undefined,
  ]

  test.each(testValues)("%s", async value => {
    const result = await PasswordComplexityValidator(value)

    expect(result).toBeDefined
  })
})

describe("PasswordComplexityValidator - invalid entries", () => {
  const testValues = ["passwordpasswordpassword", "KenCougar", "Welcome123", "d*X"]

  test.each(testValues)("%s", async value => {
    return await expect(PasswordComplexityValidator(value)).rejects.toThrow(Error)
  })
})

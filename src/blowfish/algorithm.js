import { pi_p_array, pi_s_boxes } from './arrays';

let p_array = pi_p_array
let s_boxes = pi_s_boxes

let key = [0x4B7A70E9, 0xB5B32944, 0xDB75092E, 0xC4192623,
    0xAD6EA6B0, 0x49A7DF7D, 0x9CEE60B8, 0x8FEDB266,
    0xECAA8C71, 0x699A17FF, 0x5664526C, 0xC2B19EE1,
    0x193602A5, 0x75094C29]

function swap(a, b) {
    return [b, a]
}

function func(l) {
    let temp = s_boxes[0][l >> 24]
    temp = (temp + s_boxes[1][l >> 16 & 0xff]) % 2 ** 32
    temp = temp ^ s_boxes[2][l >> 8 & 0xff]
    temp = (temp + s_boxes[3][l & 0xff]) % 2 ** 32
    return temp
}

function encryption(data) {
    let l = data >> 32
    let r = data & 0xffffffff
    for (let i = 0; i < 16; i++) {
        l = p_array[i] ^ l
        let l1 = func(l)
        r = r ^ func(l1)
        let res = swap(l, r)
        l = res[0]
        r = res[1]
    }
    let res = swap(l, r)
    l = res[0]
    r = res[1]

    l = l ^ p_array[17]
    r = r ^ p_array[16]
    let encrypted = (l << 32) ^ r
    return encrypted
}

function decryption(ciphertext) {
    ciphertext = Number(ciphertext)

    let l = ciphertext >> 32
    let r = ciphertext & 0xffffffff
    for (let i = 17; i > 1; i--) {
        l = p_array[i] ^ l
        let l1 = func(l)
        r = r ^ func(l1)
        let res = swap(l, r)
        l = res[0]
        r = res[1]
    }
    let res = swap(l, r)
    l = res[0]
    r = res[1]

    l = l ^ p_array[0]
    r = r ^ p_array[1]

    let decrypted_data = (l << 32) ^ r
    return decrypted_data
}


function driverEncryption(plaintext) {
    plaintext = Number(plaintext)

    for (let i = 0; i < 18; i++) {
        p_array[i] = p_array[i] ^ key[i % 14]
    }
    let k = 0
    let data = 0
    for (let i = 0; i < 9; i++) {
        let temp = encryption(data)
        p_array[k] = temp >> 32
        k = k + 1
        p_array[k] = temp & 0xffffffff
        k = k + 1
        data = temp
    }

    let encrypted_data = encryption(plaintext)
    return encrypted_data
}

export { driverEncryption, decryption };

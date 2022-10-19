import { pi_p_array, pi_s_boxes } from './arrays';

key = [0x4B7A70E9, 0xB5B32944, 0xDB75092E, 0xC4192623,
    0xAD6EA6B0, 0x49A7DF7D, 0x9CEE60B8, 0x8FEDB266,
    0xECAA8C71, 0x699A17FF, 0x5664526C, 0xC2B19EE1,
    0x193602A5, 0x75094C29]

function swap(a, b) {
    let temp = a
    a = b
    b = temp
    return [a, b]
}

function func(l) {
    let temp = pi_s_boxes[0][l >> 24]
    temp = (temp + pi_s_boxes[1][l >> 16 & 0xff]) % 2 ** 32
    temp = temp ^ pi_s_boxes[2][l >> 8 & 0xff]
    temp = (temp + pi_s_boxes[3][l & 0xff]) % 2 ** 32
    return temp
}

function encryption(data) {
    let l = data >> 32
    let r = data & 0xffffffff
    for (let i = 0; i < 16; i++) {
        l = pi_p_array ^ l
        let l1 = func(l)
        r = r ^ func(l1)
        let res = swap(l, r)
        r = res.a
        l = res.b
    }
    let res = swap(l, r)
    r = res.a
    l = res.b

    l = l ^ pi_p_array[17]
    r = r ^ pi_p_array[16]
    let encrypted = (l << 32) ^ r
    return encrypted
}

function decryption(data) {
    let l = data >> 32
    let r = data & 0xffffffff
    for (let i = 17; i > 0; i--) {
        l = pi_p_array[i] ^ l
        let l1 = func(l)
        r = r ^ func(l1)
        let res = swap(l, r)
        r = res.a
        l = res.b
    }
    let res = swap(l, r)
    r = res.a
    l = res.b

    l = l ^ pi_p_array[0]
    r = r ^ pi_p_array[1]

    decrpyted_data = (l << 32) ^ r
    return decrpyted_data
}


function driver() {
    for (let i = 0; i < 18; i++) {
        pi_p_array[i] = pi_p_array[i] ^ key[i % 14]
    }
    let k = 0
    let data = 0
    for (let i = 0; i < 9; i++) {
        let temp = encrpytion(data)
        pi_p_array[k] = temp >> 32
        k = k + 1
        pi_p_array = temp & 0xffffffff
        k = k + 1
        data = temp
    }
    
    // HERE IMPLEMENT ENTERING VALUE WITH REACT
    let encrpyt_data = int(input('Enter Data to Encrpyt'))
    // 

    let encrpyted_data = encrpytion(encrpyt_data)
    console.log("Encrypted Data: ", encrpyted_data)

    let decrpyted_data = decrpytion(encrpyted_data)
    console.log("Decrypted Data: ", decrpyted_data)
}

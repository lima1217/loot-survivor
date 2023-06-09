const TWO_POW_63: u256 = 0x8000000000000000;
const TWO_POW_126: u256 = 0x40000000000000000000000000000000000;
const TWO_POW_189: u256 = 0x4000000000000000000000000000000000000000000000000000000000;

const MASK_63: u256 = 0x7FFFFFFFFFFFFFFF;

const MASK_6: u256 = 0x3F;
const MASK_8: u256 = 0xFF; // Mask for 8-bit values: id, prefix1, prefix2, suffix
const MASK_16: u256 = 0xFFFF; // Mask for 16-bit values: xp
const MASK_BOOL: u256 = 0x1; // Mask for boolean values: isEquipped


const TWO_POW_8: u256 = 0x100; // 2^8
const TWO_POW_16: u256 = 0x10000; // 2^16
const TWO_POW_24: u256 = 0x1000000; // 2^24
const TWO_POW_32: u256 = 0x100000000; // 2^32
const TWO_POW_40: u256 = 0x10000000000; // 2^40
const TWO_POW_48: u256 = 0x1000000000000; // 2^48
const TWO_POW_56: u256 = 0x100000000000000; // 2^56
const TWO_POW_64: u256 = 0x10000000000000000; // 2^64
const TWO_POW_72: u256 = 0x1000000000000000000; // 2^72
const TWO_POW_80: u256 = 0x100000000000000000000; // 2^80
const TWO_POW_88: u256 = 0x10000000000000000000000; // 2^88
const TWO_POW_96: u256 = 0x1000000000000000000000000; // 2^96
const TWO_POW_104: u256 = 0x100000000000000000000000000; // 2^104
const TWO_POW_112: u256 = 0x10000000000000000000000000000; // 2^112
const TWO_POW_120: u256 = 0x1000000000000000000000000000000; // 2^120
const TWO_POW_128: u256 = 0x100000000000000000000000000000000; // 2^128
const TWO_POW_136: u256 = 0x10000000000000000000000000000000000; // 2^136
const TWO_POW_144: u256 = 0x1000000000000000000000000000000000000; // 2^144
const TWO_POW_152: u256 = 0x100000000000000000000000000000000000000; // 2^152
const TWO_POW_160: u256 = 0x10000000000000000000000000000000000000000; // 2^160
const TWO_POW_168: u256 = 0x1000000000000000000000000000000000000000000; // 2^168
const TWO_POW_176: u256 = 0x100000000000000000000000000000000000000000000; // 2^176
const TWO_POW_184: u256 = 0x10000000000000000000000000000000000000000000000; // 2^184
const TWO_POW_192: u256 = 0x1000000000000000000000000000000000000000000000000; // 2^192
const TWO_POW_200: u256 = 0x100000000000000000000000000000000000000000000000000; // 2^200
const TWO_POW_208: u256 = 0x10000000000000000000000000000000000000000000000000000; // 2^208
const TWO_POW_216: u256 = 0x1000000000000000000000000000000000000000000000000000000; // 2^216
const TWO_POW_224: u256 = 0x100000000000000000000000000000000000000000000000000000000; // 2^224
const TWO_POW_232: u256 = 0x10000000000000000000000000000000000000000000000000000000000; // 2^232
const TWO_POW_240: u256 = 0x1000000000000000000000000000000000000000000000000000000000000; // 2^240
const TWO_POW_248: u256 =
    0x100000000000000000000000000000000000000000000000000000000000000; // 2^248


const TWO_POW_6: u256 = 0x40; // 2^6
const TWO_POW_12: u256 = 0x1000; // 2^12
const TWO_POW_18: u256 = 0x40000; // 2^18
// const TWO_POW_24: u256 = 0x1000000; // 2^24
const TWO_POW_30: u256 = 0x40000000; // 2^30
const TWO_POW_36: u256 = 0x1000000000; // 2^36
const TWO_POW_42: u256 = 0x40000000000; // 2^42
// const TWO_POW_48: u256 = 0x1000000000000; // 2^48
const TWO_POW_54: u256 = 0x40000000000000; // 2^54
const TWO_POW_60: u256 = 0x1000000000000000; // 2^60
const TWO_POW_66: u256 = 0x40000000000000000; // 2^66
// const TWO_POW_72: u256 = 0x1000000000000000000; // 2^72
const TWO_POW_78: u256 = 0x40000000000000000000; // 2^78
const TWO_POW_84: u256 = 0x1000000000000000000000; // 2^84
const TWO_POW_90: u256 = 0x40000000000000000000000; // 2^90
// const TWO_POW_96: u256 = 0x1000000000000000000000000; // 2^96
const TWO_POW_102: u256 = 0x40000000000000000000000000; // 2^102
const TWO_POW_108: u256 = 0x1000000000000000000000000000; // 2^108
const TWO_POW_114: u256 = 0x40000000000000000000000000000; // 2^114
// const TWO_POW_120: u256 = 0x1000000000000000000000000000000; // 2^120
// const TWO_POW_126: u256 = 0x40000000000000000000000000000000; // 2^126
const TWO_POW_132: u256 = 0x1000000000000000000000000000000000; // 2^132
const TWO_POW_138: u256 = 0x40000000000000000000000000000000000; // 2^138
// const TWO_POW_144: u256 = 0x1000000000000000000000000000000000000; // 2^144
const TWO_POW_150: u256 = 0x40000000000000000000000000000000000000; // 2^150
const TWO_POW_156: u256 = 0x1000000000000000000000000000000000000000; // 2^156
const TWO_POW_162: u256 = 0x40000000000000000000000000000000000000000; // 2^162
// const TWO_POW_168: u256 = 0x1000000000000000000000000000000000000000000; // 2^168
const TWO_POW_174: u256 = 0x40000000000000000000000000000000000000000000; // 2^174
const TWO_POW_180: u256 = 0x1000000000000000000000000000000000000000000000; // 2^180
const TWO_POW_186: u256 = 0x40000000000000000000000000000000000000000000000; // 2^186
// const TWO_POW_192: u256 = 0x1000000000000000000000000000000000000000000000000; // 2^192
const TWO_POW_198: u256 = 0x40000000000000000000000000000000000000000000000000; // 2^198
const TWO_POW_204: u256 = 0x1000000000000000000000000000000000000000000000000000; // 2^204
const TWO_POW_210: u256 = 0x40000000000000000000000000000000000000000000000000000; // 2^210
// const TWO_POW_216: u256 = 0x1000000000000000000000000000000000000000000000000000000; // 2^216
const TWO_POW_222: u256 = 0x40000000000000000000000000000000000000000000000000000000; // 2^222
const TWO_POW_228: u256 = 0x1000000000000000000000000000000000000000000000000000000000; // 2^228
const TWO_POW_234: u256 = 0x40000000000000000000000000000000000000000000000000000000000; // 2^234
// const TWO_POW_240: u256 = 0x1000000000000000000000000000000000000000000000000000000000000; // 2^240
const TWO_POW_246: u256 = 0x40000000000000000000000000000000000000000000000000000000000000; // 2^246
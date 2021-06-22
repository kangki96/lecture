# import hashlib
# h=hashlib.sha256()
# h.update(b'Genesis')
# print(h.hexdigest())



from hashlib import sha256

# prev_hash=b'Genesis'
# for _ in range(1):
#     print(prev_hash.hex())
#     prev_hash=sha256(prev_hash).digest()
# print(prev_hash.hex())

blockchain=[]

def make_genesis_block():
    # 첫 블록 생성
    data = 'Genesis'
    prev_hash = b''
    current_hash=make_hash(data, prev_hash)
    blockchain.append((data, prev_hash, current_hash))

def make_hash(data: str, prev_hash: bytes)-> bytes:
    # 해시 생성
    return sha256(data.encode()+prev_hash).digest()

def add_block(data: str):
    # 블록 블록체인에 추가
    _,_, prev_hash = blockchain[-1]
    current_hash = make_hash(data, prev_hash)
    blockchain.append((data, prev_hash, current_hash))

def show_blockchain():
    # 블록체인 보여줌
    for i, (data, prev_hash, current_hash) in enumerate(blockchain):
        print(f'블록 {i}\n{data}\n{prev_hash.hex()}\n{current_hash.hex()}')

def verify_blockchain():
    # 블록체인 보여줍니다.
    for i in range(1, len(blockchain)):
        data, prev_hash, current_hash=blockchain[i]
        last_data, last_prev_hash, last_current_hash=blockchain[i - 1]
        if prev_hash !=last_current_hash:
            print(f"블록{i} 이전 해시 !=블록 {i - 1}현 해시. \n"
                    f"{prev_hash.hex()} !=\n{last_current_hash.hex()}")
            return False
        if last_current_hash !=(temp :=make_hash(last_data, last_prev_hash)):
            print(f"블록 {i-1}검증 실패. \n"
                    f"{last_current_hash.hex()} !=\n{temp.hex()}")
            return False
        if current_hash !=(temp := make_hash(data, prev_hash)):
            print(f"블록 {i}, 검증 실패. \n"
                    f"{current_hash.hex()} !=\n{temp.hex()}")
            return False
    return True

# def verify_blockchain():
#     # 블록체인 검증
#     for i in range(1, len(blockchain)):
#         data, prev_hash, difficulty_, nonce, current_hash = blockchain[i]
#         last_data, last_prev_hash, last_difficulty, last_nonce, last_current_hash \
#             =blockchain[i-1]
#         if prev_hash != last_current_hash:
#             print(f"[블록 {i}] 이전 해시 !=[블록 {i-1}] 현 해시.\n"
#                     f"{prev_hash} !=\n{last_current_hash}")
#             return False
#         if (last_nonce, last_current_hash) !=\
#                 (temp:=make_hash(last_data, last_prev_hash, last_difficulty)):
#             show_verify_failed(i-1, last_nonce, last_current_hash, temp[0], temp[1])
#             return False
#         if (nonce, current_hash) != (temp := make_hash(data, prev_hash, difficulty_)):
#             show_verify_failed(i, nonce, current_hash, temp[0], temp[1])
#             return False
#     return True

# def show_verify_failed(block_num, ori_nonce, ori_hash, new_nonce, new_hash):
#     print(f"블록 {block_num} 검증 실패. \n"
#             f"{ori_nonce} !={new_nonce}\n"
#             f"{ori_hash} !=\n{new_hash}")

make_genesis_block()
add_block('파이썬')
add_block('자바스크립트')
add_block('리눅스')
add_block('터미널')
show_blockchain()
print()
print(verify_blockchain())
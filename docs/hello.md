<!---
title: First mobile article
date: 2021-09-23
--->
# First mobile article

한번 써 봤습니다
하하

피씨판에서 그림과 함께 수정해 보았습니다. ㅋㅋ

![image](https://user-images.githubusercontent.com/5399854/134443061-207a47a6-5565-4c7f-be08-d6547fb38c9a.png)

그림을 `^V` 로 붙여넣으니 매우 편리합니다!!

유니코드 아이콘 ✔✅⚠🟨🟥🔺🗯💬➗🔽⬇🚫❌⭕💦

## js 코드블록 테스트

```js
Promise.resolve().then(async () => {
  console.log(await Array(10).fill().reduce(
    async (p, _, i) => {
      const ret = await p;
      return ret.concat(`some useless awaiting ${i + 1}`);
    },
    [],
  ));
};
```

## bash code block test

```bash

set -e

variable=$(df -h);
echo "===
$variable
---------"

```

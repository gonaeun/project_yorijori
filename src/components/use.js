// 게시글 보기 api
try {
    const foodIdx = 3;
    const response = await fetch(`http://localhost:4000/foods/postsee?food_idx=${foodIdx}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('정보를 불러올 수 없습니다.');
    }
    const data = await response.json();
    console.log(data);
} catch (error) {
    console.error('에러 발생', error);
    alert('정보를 불러올 수 없습니다.');
}
// 게시글 수정 api
try {
    const udptmodify = {
        food_idx: 3,
        food_name: '피자나라 치킨공주',
        food_desc: '맜잇다',
        food_video: 'null',
        food_recipe: '안알랴쥼',
        food_mood: '감자, 고추, 파인애플',
        ingre_img: 'null',
        user_id: 'kws' // 실제 user_id 값을 여기에 설정
    };

    console.log('수정하는 데이터:', udptmodify); // 프론트엔드 콘솔에 수정 데이터 출력

    const response = await fetch(`http://localhost:4000/foods/postmodify`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(udptmodify)
    });

    if (!response.ok) {
        throw new Error('정보를 수정할 수 없습니다.');
    }

    const data = await response.json();
    console.log('게시글 수정 응답:', data);
} catch (error) {
    console.error('에러 발생:', error);
    alert('정보를 수정할 수 없습니다.');
}
// 게시글 삭제 api
try {
    const food_idx = 1003; // 삭제할 게시글의 food_idx
    const user_id = 'kws'; // 사용자 ID

    const response = await fetch(`http://localhost:4000/foods/postdelete?food_idx=${food_idx}&user_id=${user_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('정보를 삭제할 수 없습니다.');
    }

    const data = await response.json();
    console.log('게시글 삭제 응답:', data);
} catch (error) {
    console.error('에러 발생:', error);
    alert('정보를 삭제할 수 없습니다.');
}

// 댓글 보기 api
try {
    const foodIdx = 3;
    const response = await fetch(`http://localhost:4000/comts/postsee?food_idx=${foodIdx}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('정보를 불러올 수 없습니다.');
    }
    const data = await response.json();
    console.log(data);
} catch (error) {
    console.error('에러 발생', error);
    alert('정보를 불러올 수 없습니다.');
}

// 댓글 삭제 
try{
    const comments_idx =4;
    const user_id = kws;
    const response = await fetch(`http://localhost:4000/comts/comtsdelete?comments_idx=${comments_idx}&user_id=${user_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('정보를 삭제할 수 없습니다.');
    }
    const data = await response.json();
    console.log('게시글 삭제 응답:', data);

}catch(erro){
    console.error('에러 발생:', error);
    alert('정보를 삭제할 수 없습니다.');
}

// 댓글 수정
try {
    const comments_idx = 3;
    const udptmodify = {
        comment_text: '맜잇다',
        
        user_id: 'kws' // 실제 user_id 값을 여기에 설정
    };

    console.log('수정하는 데이터:', udptmodify); // 프론트엔드 콘솔에 수정 데이터 출력

    const response = await fetch(`http://localhost:4000/comts/comtsmodify?comments_idx=${comments_idx}&user_id=kws`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(udptmodify)
    });

    if (!response.ok) {
        throw new Error('정보를 수정할 수 없습니다.');
    }

    const data = await response.json();
    console.log('댓글 수정 응답:', data);
} catch (error) {
    console.error('에러 발생:', error);
    alert('정보를 수정할 수 없습니다.');
}
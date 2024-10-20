import React, { useState } from 'react'; // 상태관리를 위한 useState 추가
import './RecipeAddPage.css';
import BottomBar from '../BottomBar/BottomBar.js';

function RecipeAddPage() {
    // 입력한 정보를 관리하기 위한 상태 저장공간
    const [desc, setDesc] = useState('');    // 음식 정의 -> 게시글 제목
    const [name, setName] = useState('');     // 음식 이름
    const [video, setVideo] = useState('');   // 음식 영상
    const [recipe, setRecipe] = useState(''); // 음식 레시피
    const [mood, setMood] = useState('');     // 음식 사용 식재료
    const [image, setImage] = useState('');   // 음식 이미지

    // 저장 정보를 비동기화 -> 새로고침 없이 적용되게 하는 코드
    const recipeAdd = async (e) => {          // 저장 변수 이름 및 비동기 기능
        e.preventDefault();                   // 폼의 기본 제출 시 비동기 방식으로 코드 처리 -> 새로고침 없이 정보 처리

        // 비동기로 서버로 보낼 데이터 객체 생성
        const postData = {
            food_name: name,                  // 음식 이름
            food_desc: desc,                  // 음식 정의 -> 게시글 제목
            food_video: video,                // 음식 영상
            food_recipe: recipe,              // 음식 레시피
            food_mood: mood,                  // 음식 사용 식재료
            ingre_img: image                  // 음식 이미지
        };

        try {
            // 서버 통신
            // 서버로 POST 요청 보내기
            const response = await fetch('http://localhost:4000/foods/postcreat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // 요청 헤더에 JSON 형식 명시
                },
                body: JSON.stringify(postData) // 요청 본문에 JSON 데이터 추가
            });

            // 응답 처리
            if (response.ok) {
                alert('레시피가 성공적으로 등록되었습니다.'); // 성공 시 알림
                // 폼 초기화
                setName('');
                setDesc('');
                setVideo('');
                setRecipe('');
                setMood('');
                setImage('');
            } else {
                alert('레시피 등록에 실패했습니다.'); // 실패 시 알림
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버와의 통신 중 오류가 발생했습니다.'); // 통신 오류 시 알림
        }
    };

    return (
        <div className="recipe-add-page">
            <h1 className="recipe-title">레시피 작성</h1>
            <div className="first-line"></div>
            <form onSubmit={recipeAdd}> {/* 저장정보를 제출 */}
                <div className="title-container">
                    <input type="text" className="title-input" placeholder="제목 작성" />
                </div>
                <div className="second-line"></div>
                <textarea className="recipe-input" placeholder="본문 내용을 입력하세요"></textarea>
                <div className="button-container">
                    <button type="button" className="cancel-btn-r">취소</button>
                    <button type="submit" className="submit-btn-r">등록</button>
                </div>
            </form>
            <BottomBar />
        </div>
    );
    
}

export default RecipeAddPage;

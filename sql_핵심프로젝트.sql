INSERT INTO Users (user_id, user_pw, user_name, user_nick, user_birthdate, user_gender, user_email, user_phone, user_addr, joined_at)
 VALUES 
 ('user_id 12', 'user_pw 12', 'user_name 10', 'user_nick 10', Date(NOW()), 'N', 'user_email 10', 'user_phone 10', 'user_addr 10', NOW()
 );
DROP TABLE IF EXISTS Restaurants;
INSERT INTO Users (
    user_id, user_pw, user_name, user_nick, user_birthdate, user_gender, user_email, user_phone, user_addr, joined_at
) VALUES (
    'kws', '1234', 'ruke', 'ruke', '2024-07-18', 'N', 'kws2372@naver.com', '01076106021', '하남금호', NOW()
);

USE Insa5_JSB_hacksim_1;

ALTER TABLE RecipeInputs DROP foreign key INT_UNSIGNED;
DROP TABLE IF EXISTS Ingredients;
ALTER TABLE RecipeInputs DROP FOREIGN KEY FK_RecipeInputs_ingre_idx_Ingredients_ingre_idx;
DROP TABLE IF EXISTS Ingredients;
DROP TABLE IF EXISTS RecipeInputs;

DROP TABLE IF EXISTS Diaries;
ALTER TABLE Analysis DROP foreign key FK_Analysis_diary_idx_Diaries_diary_idx;
DROP TABLE IF EXISTS Diaries;

DROP TABLE IF EXISTS Analysis;
ALTER TABLE RecoFoods DROP foreign key FK_RecoFoods_analysis_idx_Analysis_analysis_idx;

-- 테이블 생성 SQL - Ingredients
CREATE TABLE Ingredients
(
    `ingre_idx`    INT UNSIGNED      NOT NULL    AUTO_INCREMENT COMMENT '식재료 식별자', 
    `ingre_name`   VARCHAR(50)       NOT NULL    COMMENT '식재료 명', 
     PRIMARY KEY (ingre_idx)
);

-- 테이블 Comment 설정 SQL - Ingredients
ALTER TABLE Ingredients COMMENT '식재료';

DROP TABLE IF EXISTS Ingredients;



ALTER TABLE Ingredients
ADD CONSTRAINT fk_food
FOREIGN KEY (`food_idx`) REFERENCES Foods(food_idx);

ALTER TABLE Foods
ADD COLUMN ingre_img VARCHAR(1200) NULL COMMENT '식재료 사진';

ALTER TABLE Foods
MODIFY COLUMN ingre_img BLOB NULL COMMENT '식재료 사진';

CREATE TABLE Comments
(
    `comments_idx`    INT UNSIGNED      NOT NULL    AUTO_INCREMENT COMMENT '댓글 식별자', 
   `comment_text` VARCHAR(500) NOT NULL COMMENT '댓글 내용',
    `user_id` VARCHAR(30) NOT NULL COMMENT '회원 아이디',
     PRIMARY KEY (comments_idx)
);



ALTER TABLE Comments
ADD CONSTRAINT fk_comments
FOREIGN KEY (`user_id`) REFERENCES Users(User_id);

ALTER TABLE Comments 
ADD CONSTRAINT fk_foods
FOREIGN KEY (`food_idx`) REFERENCES Foods(food_idx);

ALTER TABLE Comments
ADD COLUMN `food_idx` INT UNSIGNED NOT NULL COMMENT '음식 식별자';

ALTER TABLE Comments
ADD COLUMN `food_emotion` CHAR(1) NOT NULL COMMENT '음식 감정';

USE Insa5_JSB_hacksim_1;

ALTER TABLE Comments
ADD column `Comments_time` datetime not null comment '댓글 등록 날짜';

ALTER TABLE Foods
ADD column `foods_time` datetime not null comment '게시글 등록 날짜';

DESCRIBE Comments;
DESCRIBE Favorites;
DESCRIBE Foods;
DESCRIBE Ingredients;
DESCRIBE RecoFoods;
DESCRIBE Users;
SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'Insa5_JSB_hacksim_1'
ORDER BY TABLE_NAME, ORDINAL_POSITION;

DROP TABLE RecoFoods;
alter table Foods
MODIFY COLUMN Food_mood TEXT;
alter table Foods
change COLUMN Food_mood food_mood Text;
ALTER TABLE Foods
MODIFY COLUMN foods_time DATETIME;


LOAD DATA INFILE 'C:\\Users\\82107\\Desktop\\Foods.csv'
INTO TABLE Foods
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(food_idx, food_name, food_desc, food_video, food_recipe, food_mood, intre_img, foods_time);

ALTER TABLE Foods
DROP COLUMN foods_time;

USE Insa5_JSB_hacksim_1;
ALTER TABLE Comments MODIFY COLUMN comment_text TEXT NULL;

ALTER TABLE Comments CHANGE Comments_time comments_time DATETIME NOT NULL;

-- 1. Foods 테이블에 user_id 열 추가 (NULL 허용)
ALTER TABLE Foods
ADD COLUMN user_id INT NULL;

-- 2. user_id 열에 외래 키 제약 조건 추가
ALTER TABLE Foods
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES Users(user_id);

ALTER TABLE Users MODIFY COLUMN user_pw VARCHAR(255);

update Users
set user_pw = '$2b$10$WUj1J9AV48wMjB9nUbR1AOhfxptY.IoqiwRAj/oGjxF.3smK1TpFe'
where user_id = 'kws';

SELECT * FROM Users WHERE user_id = 'kws';

ALTER TABLE Users MODIFY COLUMN user_gender VARCHAR(10);



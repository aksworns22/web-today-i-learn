# Today I Learn 페이지 만들기

## DB - 실습

### 문제 1: 테이블 생성하기

```sql
CREATE TABLE crew(
  crew_id INT NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(50) NOT NULL,
  PRIMARY KEY (crew_id)
);

INSERT INTO crew(crew_id, nickname) 
SELECT DISTINCT `crew_id`, `nickname` FROM `attendance`;
```

### 문제 2: 테이블 컬럼 삭제하기

```sql
ALTER TABLE attendance
DROP COLUMN nickname;
```

### 문제 3: 외래키 설정하기

```sql
ALTER TABLE attendance
ADD CONSTRAINT fk_crew
FOREIGN KEY (crew_id)
REFERENCES crew(crew_id);
```

### 문제 4: 유니크 키 설정

```sql
ALTER TABLE crew 
ADD CONSTRAINT uq_nickname UNIQUE(nickname);
```

### 문제 5: 크루 닉네임 검색하기

```sql
SELECT * FROM crew WHERE nickname LIKE  "디%";
```

### 문제 6: 출석 기록 확인하기

```sql
SELECT *
FROM attendance as a
INNER JOIN crew as b ON a.crew_id = b.crew_id
WHERE nickname = "어셔";
```

### 문제 7: 누락된 출석 기록 추가

```sql
INSERT crew(nickname) VALUES ("어셔");

INSERT INTO attendance(crew_id, attendance_date, start_time, end_time) VALUES
  (
    (SELECT crew_id FROM crew WHERE nickname = "어셔"),
    "2025-03-06",
    "09:31:00",
    "18:01:00"
  );
```

### 문제 8: 잘못된 출석 기록 수정

```sql
UPDATE attendance
SET start_time = '10:00:00'
WHERE crew_id = (
  SELECT crew_id FROM crew WHERE nickname = '워니'
)
AND attendance_date = '2025-03-12';
```

### 문제 9: 허위 출석 기록 삭제

```sql
DELETE FROM attendance
WHERE crew_id = (
  SELECT crew_id FROM crew WHERE nickname = '제임스'
)
AND attendance_date = '2025-03-12';
```

### 문제 10: 출석 정보 조회하기

```sql
SELECT a.*, b.nickname FROM attendance as a
INNER JOIN crew as b ON a.crew_id = b.crew_id;
```

### 문제 11: nickname으로 쿼리 처리하기

```sql
SELECT * FROM attendance 
WHERE crew_id = (SELECT crew_id FROM crew WHERE nickname = "제임스");
```

### 문제 12: 가장 늦게 하교한 크루 찾기

```sql
SELECT b.nickname, a.attendance_date, a.end_time
FROM attendance a
JOIN crew b ON a.crew_id = b.crew_id
WHERE a.attendance_date = '2025-03-05'
ORDER BY a.end_time DESC
LIMIT 1;
```

### 문제 13: 크루별로 '기록된' 날짜 수 조회

```sql
SELECT b.nickname, COUNT(*) as attendance_count FROM attendance as a
JOIN crew as b ON a.crew_id = b.crew_id
GROUP BY b.nickname; 
```

### 문제 14: 크루별로 등교 기록이 있는(start_time is NOT NULL) 날짜 수 조회

```sql
SELECT b.nickname, COUNT(DISTINCT a.attendance_date) AS attendance_days
FROM attendance a
JOIN crew b ON a.crew_id = b.crew_id
WHERE a.start_time IS NOT NULL
GROUP BY b.nickname;
```

### 문제 15: 날짜별로 등교한 크루 수 조회

```sql
SELECT attendance_date, COUNT(DISTINCT crew_id)
FROM attendance GROUP BY attendance_date;
```

### 문제 16: 크루별 가장 빠른 등교 시각(MIN)과 가장 늦은 등교 시각(MAX)

```sql
SELECT
    crew_id,
    MIN(start_time) AS earliest_time,
    MAX(start_time) AS latest_time
FROM attendance
GROUP BY crew_id;
```
console.log('Hello World');
// sync-data.js
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

// GitHub Secrets를 통해 환경 변수로 전달될 값들
const externalApiUrl = process.env.EXTERNAL_API_URL;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY; // 또는 SERVICE_ROLE_KEY

if (!externalApiUrl || !supabaseUrl || !supabaseKey) {
  console.error(
    'Error: Missing required environment variables (EXTERNAL_API_URL, SUPABASE_URL, SUPABASE_KEY)'
  );
  process.exit(1); // 환경 변수 없으면 실패 처리
}

// Supabase 클라이언트 초기화
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchDataAndSync() {
  console.log('Starting data fetch from API...');
  try {
    // 1. 외부 API에서 데이터 가져오기
    const response = await axios.get(externalApiUrl);
    const apiData = response.data; // API 응답 구조에 맞게 조정 필요

    console.log(
      `Successfully fetched data. Records count: ${apiData.length || 1}`
    ); // 데이터 형태에 따라 로그 조정

    if (apiData[0].result !== 1) {
      console.log('No data to insert. The result is invalid');
      return;
    }

    // 2. 가져온 데이터를 Supabase 테이블 형식에 맞게 가공 (필요시)
    // 예시: API 데이터가 객체 배열이라고 가정
    // 실제 API 응답과 Supabase 테이블 구조에 맞게 이 부분을 수정해야 합니다.
    // const dataToInsert = Array.isArray(apiData) ? apiData : [apiData]; // 배열이 아니면 배열로 감싸기

    const dataToInsert = apiData.map((currencyData) => ({
      currency_code: currencyData.cur_unit,
      currency_name: currencyData.cur_nm,
      rate_when_get: currencyData.ttb,
      rate_when_send: currencyData.tts,
      standard_rate: currencyData.deal_bas_r,
    }));

    // 3. Supabase에 데이터 삽입 (또는 업데이트/업서트)
    // 'your_table_name' 을 실제 테이블 이름으로 변경하세요.
    console.log(
      `Attempting to insert/upsert ${dataToInsert.length} records into Supabase table 'your_table_name'...`
    );
    const { data, error } = await supabase
      .from('your_table_name') // *** 여기에 실제 테이블 이름을 입력하세요 ***
      .upsert(dataToInsert, { onConflict: 'currency_code' }); // 예: 'id' 컬럼 기준으로 중복 시 업데이트 (필요에 따라 .insert() 또는 옵션 변경)

    if (error) {
      console.error('Error inserting data into Supabase:', error.message);
      // 에러 세부 정보 로깅 (선택 사항)
      // console.error('Supabase error details:', error);
      throw error; // 에러 발생 시 워크플로우 실패 처리
    } else {
      console.log('Successfully synced data to Supabase.');
      // 성공 시 삽입된 데이터 로깅 (선택 사항, 데이터 양이 많으면 생략)
      // console.log('Inserted/Updated data:', data);
    }
  } catch (error) {
    console.error('An error occurred during the sync process:', error.message);
    // 스택 트레이스 로깅 (디버깅에 유용)
    // console.error(error.stack);
    process.exit(1); // 에러 발생 시 워크플로우 실패 처리
  }
}

// 스크립트 실행
fetchDataAndSync();

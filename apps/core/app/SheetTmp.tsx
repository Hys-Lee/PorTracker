import * as XLSX from 'xlsx';
const SheetTmp = () => {
  const handleupload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    //test
    console.log('file: ', file);
    reader.onload = (evt) => {
      const data = evt.target!.result as ArrayBuffer;
      const workbook = XLSX.read(data, { type: 'array' });
      // test
      console.log('workbook: ', workbook);
      const sheetname = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetname];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log('json: ', json);
    };
    reader.readAsArrayBuffer(file);
  };
  return (
    <>
      <div>
        <label>야호</label>
        <input type="file" onChange={(e) => handleupload(e)} />
      </div>
    </>
  );
};
export default SheetTmp;

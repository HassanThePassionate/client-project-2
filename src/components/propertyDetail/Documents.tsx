import DownloadIcon from "../svgs/DownloadIcon";

const Documents = () => {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-6 mt-3'>Documents</h1>

      <div className='space-y-4'>
        <div className='flex items-center justify-between py-4 border-b'>
          <h4 className='text-blue-600 text-sm'>Appraisal Report</h4>
          <button className='px-4 py-2 border rounded hover:bg-[#f2f2f2] flex items-center gap-2 text-[#58626f] text-sm h-[40px] font-medium cursor-pointer border-[#c4c8cc]'>
            <DownloadIcon />
            Download
          </button>
        </div>

        <div className='flex items-center justify-between py-4 border-b'>
          <h4 className='text-blue-600  text-sm'>
            Key Investment Information Sheet
          </h4>
          <button className='px-4 py-2 border rounded hover:bg-[#f2f2f2] flex items-center gap-2 text-[#58626f] text-sm h-[40px] font-medium cursor-pointer border-[#c4c8cc]'>
            <DownloadIcon />
            Download
          </button>
        </div>

        <div className='flex items-center justify-between py-4 border-b'>
          <h4 className='text-blue-600  text-sm'>Loan Request</h4>
          <button className='px-4 py-2 border rounded hover:bg-[#f2f2f2] flex items-center gap-2 text-[#58626f] text-sm h-[40px] font-medium cursor-pointer border-[#c4c8cc] '>
            <DownloadIcon />
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default Documents;

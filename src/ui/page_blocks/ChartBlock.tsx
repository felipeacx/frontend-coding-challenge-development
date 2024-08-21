import { BarChart } from '../components/Chart';
import { useToastContext } from '../providers/toast';

// TODO replace this with a fetch request to /api/data
const mockData = { datasetOne: [75, -30, -45, -90, 20, 30], datasetTwo: [15, -15, 25, -60, 80, 90] };

export function ChartBlock() {
  // TODO show success/failure toast message
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { renderToast } = useToastContext();

  return (
    <div>
      <div className='mb-12 flex items-center'>
        <div className='flex flex-col mx-4'>
          <span className='text-sm'>Min</span>
          <input type='number' className='w-24 h-8 text-sm' />
        </div>
        <div className='flex flex-col mx-4'>
          <span className='text-sm'>Max</span>
          <input type='number' className='w-24 h-8 text-sm' />
        </div>
        <div className='flex flex-col mx-4 pt-4 w-100'>
          <button className='bg-blue-600 flex justify-center items-center h-10 text-center text-white border focus:outline-none focus:ring-4 font-sm rounded-lg text-sm px-5 py-1.9'>
            Reset
          </button>
        </div>
      </div>
      <div>
        <BarChart
          width={600}
          height={300}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                label: 'Dataset 1',
                data: mockData.datasetOne,
                backgroundColor: 'rgb(255, 99, 132)',
              },
              {
                label: 'Dataset 2',
                data: mockData.datasetTwo,
                backgroundColor: 'rgb(54, 162, 235)',
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

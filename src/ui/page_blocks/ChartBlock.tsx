/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useEffect, useMemo, useState } from 'react';
import { BarChart } from '../components/Chart';
import { useToastContext } from '../providers/toast';
import { APIResponse } from '@/providers/toast/types';

export function ChartBlock() {
  // TODO show success/failure toast message
  const { renderToast } = useToastContext();

  // State to manage data
  const [mockData, setMockData] = useState<APIResponse>(undefined);
  const [min, setMin] = useState<number | string>('');
  const [max, setMax] = useState<number | string>('');

  // Fetch request to /api/data
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data/chart-data');
      const data = await response.json();
      setMockData(data);
      renderToast(data.status, data.message);
    } catch (err: any) {
      renderToast('error', err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(parseInt(event.target.value));
  };

  const onChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMax(parseInt(event.target.value));
  };

  const onReset = () => {
    fetchData();
    setMin('');
    setMax('');
  };

  // Memoized filtered dataset based on min and max values entered
  const filteredData = useMemo(() => {
    if (!mockData?.data) return undefined;
    let filteredDatasetOne = mockData?.data?.datasetOne;
    let filteredDatasetTwo = mockData?.data?.datasetTwo;
    if (typeof min === 'number' && typeof max === 'number') {
      filteredDatasetOne = mockData?.data?.datasetOne.filter(
        (num: number) => typeof min === 'number' && num >= min && typeof max === 'number' && num <= max,
      );
      filteredDatasetTwo = mockData?.data?.datasetTwo.filter(
        (num: number) => typeof min === 'number' && num >= min && typeof max === 'number' && num <= max,
      );
    } else if (typeof min === 'number') {
      filteredDatasetOne = mockData?.data?.datasetOne.filter((num: number) => typeof min === 'number' && num >= min);
      filteredDatasetTwo = mockData?.data?.datasetTwo.filter((num: number) => typeof min === 'number' && num >= min);
    } else if (typeof max === 'number') {
      filteredDatasetOne = mockData?.data?.datasetOne.filter((num: number) => typeof max === 'number' && num <= max);
      filteredDatasetTwo = mockData?.data?.datasetTwo.filter((num: number) => typeof max === 'number' && num <= max);
    }
    if (min > max) {
      renderToast('error', 'Min value should be minus than Max value');
    }
    return {
      datasetOne: filteredDatasetOne,
      datasetTwo: filteredDatasetTwo,
    };
  }, [mockData, min, max]);

  return (
    <div>
      <div className='mb-12 flex items-center'>
        <div className='flex flex-col mx-4'>
          <span className='text-sm'>Min</span>
          <input type='number' className='w-24 h-8 text-sm' value={min} onChange={onChangeMin} />
        </div>
        <div className='flex flex-col mx-4'>
          <span className='text-sm'>Max</span>
          <input type='number' className='w-24 h-8 text-sm' value={max} onChange={onChangeMax} />
        </div>
        <div className='flex flex-col mx-4 pt-4 w-100'>
          <button
            onClick={onReset}
            className='bg-blue-600 flex justify-center items-center h-10 text-center text-white border focus:outline-none focus:ring-4 font-sm rounded-lg text-sm px-5 py-1.9'>
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
                data: filteredData?.datasetOne,
                backgroundColor: 'rgb(255, 99, 132)',
              },
              {
                label: 'Dataset 2',
                data: filteredData?.datasetTwo,
                backgroundColor: 'rgb(54, 162, 235)',
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

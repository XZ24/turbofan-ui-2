import React from 'react';

interface ParameterProps {
  name: string;
  value: number;
  onChange: (newValue: number) => void;
}

const Parameter: React.FC<ParameterProps> = ({ name, value, onChange }) => {
  // 增加数值
  const handleIncrement = () => {
    onChange(Math.round((value + 0.01) * 100) / 100);
  };

  // 减少数值 (允许负数)
  const handleDecrement = () => {
    onChange(Math.round((value - 0.01) * 100) / 100);
  };

  // 处理手动输入 (允许负数)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(Math.round(newValue * 100) / 100);
    }
  };

  return (
    <div className="col-span-4">
      <div className="flex items-center justify-center px-2">
        <form>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row items-center">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                htmlFor="numericValue"
              >
                {name} {/* 显示传入的名称 */}
              </label>

              <div className="relative flex items-center">
                <input
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  type="number"
                  name="numericValue"
                  id="numericValue"
                  value={value}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
            </div>

            <button
              className="flex items-center justify-center rounded-[7px] my-2 border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
              type="button"
              onClick={handleDecrement}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 11h16v2H4v-2z" />
              </svg>
            </button>

            <button
              className="flex items-center justify-center rounded-[7px] bg-primary my-2 px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
              type="button"
              onClick={handleIncrement}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Parameter;

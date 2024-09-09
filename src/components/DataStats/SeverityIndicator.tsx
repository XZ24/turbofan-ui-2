interface SeverityIndicatorProps {
    value: number; // 当前值
    name: string; // 参数名称
    thresholds: { green: [number, number]; yellow: [number, number]; red: [number, number] }; // 每个级别的范围
  }
  
  const SeverityIndicator: React.FC<SeverityIndicatorProps> = ({ value, name, thresholds }) => {
    let severityClass = "";
    let textColorClass = "";
    let severityText = "";
  
    // 依据阈值判断严重等级
    if (value >= thresholds.green[0] && value <= thresholds.green[1]) {
      // 绿色
      severityClass = "border-green bg-green-light-7 dark:bg-[#1B1B24]";
      textColorClass = "text-[#004434] dark:text-[#34D399]";
      severityText = "Green";
    } else if (value >= thresholds.yellow[0] && value <= thresholds.yellow[1]) {
      // 黄色
      severityClass = "border-[#FFB800] bg-[#FEF5DE] dark:bg-[#1B1B24]";
      textColorClass = "text-[#004434] dark:text-[#D0915C]";
      severityText = "Yellow";
    } else if (value >= thresholds.red[0] && value <= thresholds.red[1]) {
      // 红色
      severityClass = "border-red-light bg-red-light-5 dark:bg-[#1B1B24]";
      textColorClass = "text-[#BC1C21] dark:text-[#BC1C21]";
      severityText = "Red";
    }
  
    return (
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="my-2 flex items-center justify-between">
          <div>
            <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">{value}</h4>
            <span className="text-body-sm font-medium">{name}</span>
          </div>
        </div>
  
        {/* 动态渲染的颜色部分 */}
        <div className={`flex items-center justify-center mt-5 w-full h-auto rounded-[10px] border-l-6 px-7.5 py-2.5 ${severityClass}`}>
          <div className="w-full">
            <h5 className={`text-body-sm font-bold leading-[18px] ${textColorClass}`}>
              {severityText}
            </h5>
          </div>
        </div>
      </div>
    );
  };
  
  export default SeverityIndicator;
  
import React, { useState, useEffect } from 'react';
import CustTable from './components/CustTable';
import CustBarChart, { EChartsOption } from './components/CustBarChart';
import moment from 'moment';

const Page2: React.FC = () => {
  const [name,setName] = useState<string>('');
  const [tableData, setTableData] = useState<any[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [option, setOption] = useState<EChartsOption>({});

  useEffect(() => {
    fetch('http://localhost:3001/sleepduration')
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error('Error fetching table data:', error));

    if( name !== ''){
      fetch(`http://localhost:3001/sleepduration/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setBarChartData(data)
        setOption({
          xAxis: {
            type: "category",
            data: data.map((d: { createDate: moment.MomentInput; })=> {return moment(d.createDate).format('YYYY-MM-DD')})
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: data.map((d: { sleepDuration: any; })=> {return d.sleepDuration}),
              type: "bar"
            }
          ]
        } as EChartsOption)
      })
      .catch((error) => console.error('Error fetching bar chart data:', error));

    }
  }, [name]);
  const handleRowClick = (name: string) => {
    setName(name)
    console.log(`Row clicked: ${name}`);
  };
  return (
    <div>
      <CustTable data={tableData} onRowClick={handleRowClick}  />
      <CustBarChart option={option} style={{ backgroundColor: "#eee" }} />
    </div>
  );
};

export default Page2;
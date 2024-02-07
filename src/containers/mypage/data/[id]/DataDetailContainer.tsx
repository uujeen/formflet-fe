export default function DataDetailContainer({ data }: { data: Record<string, string>[] }) {
  return (
    <div className="my-[18px] max-w-[850px] overflow-x-scroll">
      {data.length ? (
        <table className="w-[850px] border-spacing-0 rounded-[32px] border-gray-light-active">
          <thead>
            <tr className="bg-gray-light-normal">
              {Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  className="min-w-[120px] px-[12px] py-[10px] b2 text-gray-dark-active border border-gray-light-active"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                {Object.keys(d).map((key) => {
                  if (d[key].includes('.pdf')) {
                    const arr = d[key].split(', ');
                    return (
                      <td
                        key={key}
                        className="px-[12px] py-[10px] b2 text-gray-dark-active border border-gray-light-active break-keep"
                      >
                        <a href={arr[1]} target="_blank" rel="noreferrer" className="">
                          {arr[0]}
                        </a>
                      </td>
                    );
                  }
                  return (
                    <td
                      key={key}
                      className="px-[12px] py-[10px] b2 text-gray-dark-active border border-gray-light-active break-keep"
                    >
                      {d[key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

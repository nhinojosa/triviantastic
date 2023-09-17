const useColor = () => {
  const colors = ['bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500'] //made colors all the same
  const getColor = (index) => colors[index % colors.length]
  return { getColor }
}

export default useColor
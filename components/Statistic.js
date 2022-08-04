export default function Statistic({ stat, name }) {
  return (
    <div class="flex flex-wrap justify-center pr-4">
      <div class="flex w-full justify-center">
        <text class="text-4xl text-right font-light">{stat}</text>
      </div>
      <div class="flex w-full justify-center">
        <text class="font-bold text-center text-sm">{name}</text>
      </div>
    </div>
  );
}

const fs = require('fs');

let code = fs.readFileSync('src/app/(app)/layout.tsx', 'utf8');
code = code.replace(/<nav className="flex-1 overflow-y-auto px-3 py-6">[\s\S]*?<\/nav>/, 
`<nav className="flex-1 overflow-y-auto px-2 py-6">
          <ul className="flex flex-col gap-2 list-none m-0 p-0">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              const Icon = item.icon;

              const linkContent = (
                <div
                  className={[
                    "flex items-center rounded-lg transition-all duration-200 cursor-pointer overflow-hidden",
                    !isExpanded ? "justify-center h-12 w-12 mx-auto" : "gap-3 px-3 py-3",
                    item.disabled
                      ? "text-white/25 cursor-not-allowed"
                      : isActive
                        ? "bg-[#22c55e] text-white shadow-md shadow-[#22c55e]/25"
                        : "text-white/60 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  <Icon className="text-[20px] shrink-0" />
                  <div className={\`transition-all duration-300 flex items-center shrink-0 \${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}\`}>
                    <span className="text-[14px] font-medium whitespace-nowrap">{item.name}</span>
                    {item.disabled && (
                      <span className="ml-3 text-[9px] font-bold uppercase tracking-wider bg-white/5 text-white/30 px-1.5 py-0.5 rounded border border-white/10">
                        Bientôt
                      </span>
                    )}
                  </div>
                </div>
              );

              if (item.disabled) {
                return (
                  <li key={item.name} className="block">
                    {!isExpanded ? (
                      <Tooltip title={item.name} placement="right">
                        {linkContent}
                      </Tooltip>
                    ) : (
                      linkContent
                    )}
                  </li>
                );
              }

              return (
                <li key={item.name} className="block">
                  {!isExpanded ? (
                    <Tooltip title={item.name} placement="right">
                      <Link href={item.href} className="no-underline block">
                        {linkContent}
                      </Link>
                    </Tooltip>
                  ) : (
                    <Link href={item.href} className="no-underline block">
                      {linkContent}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>`);
fs.writeFileSync('src/app/(app)/layout.tsx', code);
console.log("Fixed layout.tsx");

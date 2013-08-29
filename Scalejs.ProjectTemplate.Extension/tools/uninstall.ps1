param($installPath, $toolsPath, $package, $project)

$project |
	Remove-Paths '$projectname$' |
	Remove-ScalejsExtension '$projectname$' |
	Out-Null

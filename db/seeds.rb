# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


puts "delete table Categories"
Categories.destroy_all

puts "delete table Tasks"
Tasks.destroy_all



puts "Create some Categories (urgent, pas urgent)"
urgent = Categories.create!(
  name: "Urgent"
)
important = Categories.create!(
  name: "Important"
)
attente = Categories.create!(
  name: "En attente"
)

puts "Create some Tasks (email / password)"
Tasks.create!(
  name: "My first task",
  ending_date: Date.today,
  done: false,
  category: urgent
)
Tasks.create!(
  name: "My first task",
  ending_date: Date.today,
  done: false,
  category: important
)



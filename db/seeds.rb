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
Category.destroy_all

puts "delete table Tasks"
Task.destroy_all


puts "Create some Categories (urgent, pas urgent)"
urgent = Category.create!(
  name: "Urgent"
)
important = Category.create!(
  name: "Important"
)
attente = Category.create!(
  name: "En attente"
)

puts "Create some Tasks (email / password)"
Task.create!(
  name: "My first task",
  ending_date: Date.today,
  done: false,
  category: urgent
)
Task.create!(
  name: "My second task",
  ending_date: Date.today,
  done: false,
  category: important
)

User.create!(
  email: 'alex@test.com',
  password: 'aaaaaa'
)

